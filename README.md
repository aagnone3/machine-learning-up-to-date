# machine-learning-up-to-date

## Install
```bash
brew tap aws/tap
brew install aws-sam-cli
```

## Deploy

```bash
sam build
# add --guided for initial deploy, which creates a samconfig.toml file
sam deploy
```

If you hit a failure deploying the initial stack (and only during the initial deploy), delete the stack before re-trying:
`aws cloudformation delete-stack --stack-name <stack-name>`