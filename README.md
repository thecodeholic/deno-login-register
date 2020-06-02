# Registration & Login in Deno

**If you want to follow the tutorial you can switch on [initial-version](https://github.com/thecodeholic/deno-login-register/tree/initial-version) branch and use the views files.**

#### Sample Login, Registration system with with [Deno](https://deno.land) and [oak framework](https://deno.land/x/oak)

> The project was created along with Youtube Video [Registration & Login System in Deno](https://youtu.be/2TRipZfWEGY). I appreaciate if you like the video and share it.

## Features

 - Written in Typescript
 - Login page
 - Registration page
 - [dejs](https://deno.land/x/dejs) template engine
 - Protected pages available for authorized users only
 - Password encrypted using [bcrypt](https://deno.land/x/bcrypt)
 - Using [JWT](https://deno.land/x/djwt) tokens
 - [dotenv](https://deno.land/x/dotenv) implementation

## Installation

You need to have [Deno installed](https://deno.land/#installation) in order to run this app locally

1. Clone the project
1. Copy `.env.example` into `.env` and set `JWT_KEY` to some random unique key
1. Navigate to the project root directory using terminal
1. And run `deno run --allow-net --allow-read --allow-env server.ts`

