# AWS Infrastructure — Zero Homeless Initiative Hub

## What's deployed

| Resource | Purpose |
|---|---|
| S3 `zero-hub-documents` | Private document storage (client IDs, records) |
| S3 `zero-hub-public` | Public assets (logos, images) served via CDN |
| CloudFront CDN | Fast global delivery via `cdn.zerofoundationusa.org` |
| ACM Certificate | SSL for `*.zerofoundationusa.org` |
| IAM Role | App service role for Lambda/Firebase functions |
| IAM User | GitHub Actions CI/CD deploy user |

## Deploy the stack

```bash
aws cloudformation deploy \
  --template-file infra/aws/cloudformation.yml \
  --stack-name zero-hub-production \
  --parameter-overrides Environment=production DomainName=zerofoundationusa.org \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-west-2
```

## GitHub Secrets Required

Add these in GitHub → Settings → Secrets & variables → Actions:

| Secret | Description |
|---|---|
| `AWS_ACCESS_KEY_ID` | From IAM User `zero-hub-github-actions-production` |
| `AWS_SECRET_ACCESS_KEY` | From IAM User |
| `AWS_CLOUDFRONT_DIST_ID` | CloudFront distribution ID (from stack outputs) |
| `FIREBASE_SERVICE_ACCOUNT` | Firebase service account JSON |
| `NEXT_PUBLIC_FB_API_KEY` | Firebase web config |
| `NEXT_PUBLIC_FB_AUTH_DOMAIN` | Firebase web config |
| `NEXT_PUBLIC_FB_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FB_STORAGE_BUCKET` | Firebase storage bucket |
| `NEXT_PUBLIC_FB_MESSAGING_SENDER_ID` | Firebase messaging |
| `NEXT_PUBLIC_FB_APP_ID` | Firebase app ID |
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | Google Maps API key |
| `TWILIO_ACCOUNT_SID` | Twilio SMS relay |
| `TWILIO_AUTH_TOKEN` | Twilio SMS relay |
| `TWILIO_FROM_NUMBER` | Twilio phone number |

## Workflow

```
dev branch push  →  CI type check + preview deploy (Firebase preview channel)
main branch push →  CI + production deploy (Firebase live) + S3/CloudFront sync
PR to main       →  CI check + preview URL posted to PR
```
