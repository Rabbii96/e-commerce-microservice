FROM golang:1.22-alpine

WORKDIR /app

COPY main.go .

RUN go build -o shipping-service main.go

EXPOSE 8080

CMD ["./shipping-service"]
