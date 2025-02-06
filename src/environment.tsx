let env = "https://localhost:7240"

if (process.env.NODE_ENV === 'development') {
    env = "http://localhost:7240"
}
else {
    env = "http://localhost:8888"
}

export { env } 