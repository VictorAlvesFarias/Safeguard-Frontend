let env = "https://localhost:7240"

if (process.env.NODE_ENV === 'development') {
    env = "http://localhost:7240"
}

export { env } 