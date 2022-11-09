terraform {
  backend "http" {
    address        = "https://gitlab.plap.house/api/v4/projects/42/terraform/state/default"
    lock_address   = "https://gitlab.plap.house/api/v4/projects/42/terraform/state/default/lock"
    unlock_address = "https://gitlab.plap.house/api/v4/projects/42/terraform/state/default/lock"
    username       = "terraform"
    lock_method    = "POST"
    unlock_method  = "DELETE"
    retry_wait_min = 1
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

# This key needs full S3 and CloudFront permissions
variable "aws_access_key_id" {
  type = string
}
variable "aws_secret_access_key" {
  type = string
}

locals {
  s3_origin_id = "artsite_site_s3_origin"
  # TODO(keea): Put in the real domain at some point
  external_domain = "artsite.keea.dog"
}

provider "aws" {
  region     = "us-west-1"
  access_key = var.aws_access_key_id
  secret_key = var.aws_secret_access_key
}
provider "aws" {
  alias      = "us-east-1"
  region     = "us-east-1"
  access_key = var.aws_access_key_id
  secret_key = var.aws_secret_access_key
}

resource "aws_s3_bucket" "artsite_site" {
  bucket = "artsite-site"
}

resource "aws_s3_bucket_acl" "artsite_site" {
  bucket = aws_s3_bucket.artsite_site.id
  acl    = "private"
}

resource "aws_cloudfront_origin_access_control" "artsite" {
  name                              = "artsite"
  description                       = "access to artsite site bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_acm_certificate" "artsite_cert" {
  provider          = aws.us-east-1
  domain_name       = local.external_domain
  validation_method = "DNS"

  tags = {
    Environment = "production"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "artsite_cert" {
  certificate_arn         = aws_acm_certificate.artsite_cert.arn
  validation_record_fqdns = [local.external_domain]
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = aws_s3_bucket.artsite_site.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.artsite.id
    origin_id                = local.s3_origin_id
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = [local.external_domain]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_All"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.artsite_cert.arn
    minimum_protocol_version = "TLSv1.2_2021"
    ssl_support_method       = "sni-only"
  }

  tags = {
    Environment = "production"
  }
}

data "aws_iam_policy_document" "allow_cloudfront" {
  statement {
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions = [
      "s3:GetObject",
    ]

    resources = [
      aws_s3_bucket.artsite_site.arn,
      "${aws_s3_bucket.artsite_site.arn}/*",
    ]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.s3_distribution.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "allow_cloudfront" {
  bucket = aws_s3_bucket.artsite_site.id
  policy = data.aws_iam_policy_document.allow_cloudfront.json
}

output "dns_cert_validation" {
  value = aws_acm_certificate.artsite_cert.domain_validation_options
}

output "dns_cname" {
  value = aws_cloudfront_distribution.s3_distribution.domain_name
}

