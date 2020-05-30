import { RouterContext } from "https://deno.land/x/oak@v5.0.0/mod.ts";
import { renderFileToString } from "https://deno.land/x/dejs@0.7.0/mod.ts";
import { hashSync, compareSync } from "https://deno.land/x/bcrypt@v0.2.1/mod.ts";
import { makeJwt, setExpiration, Jose } from "https://deno.land/x/djwt@v0.9.0/create.ts";
import { users, User } from './users.ts';

const header: Jose = {
  alg: 'HS256',
  typ: 'JWT'
};

export const home = async (ctx: RouterContext) => {
  const currentUser = ctx.state.currentUser;
  ctx.response.body = await renderFileToString(
    `${Deno.cwd()}/views/home.ejs`,
    {
      user: currentUser
    },
  );
}

export const login = async (ctx: RouterContext) => {
  ctx.response.body = await renderFileToString(
    `${Deno.cwd()}/views/login.ejs`,
    {
      error: false,
    },
  );
}

export const register = async (ctx: RouterContext) => {
  ctx.response.body = await renderFileToString(
    `${Deno.cwd()}/views/register.ejs`,
    {},
  );
}

export const postLogin = async (ctx: RouterContext) => {
  const { value } = await ctx.request.body();
  const username = value.get("username");
  const password = value.get("password");

  const user: any = users.find((u: User) => u.username === username);
  if (!user) {
    ctx.response.body = await renderFileToString(
      `${Deno.cwd()}/views/login.ejs`,
      {
        error: "Incorrect username",
      },
    );
  } else if (!compareSync(password, user.password)) {
    ctx.response.body = await renderFileToString(
      `${Deno.cwd()}/views/login.ejs`,
      {
        error: "Incorrect password",
      },
    );
  } else {
    const payload = {
      iss: user.username,
      exp: setExpiration(Date.now() + 1000 * 60 * 60)
    };
    const jwt = makeJwt({ key: Deno.env.get('JWT_KEY') || '', header, payload })
    ctx.cookies.set('jwt', jwt);
    ctx.response.redirect('/');
  }
}

export const postRegister = async (ctx: RouterContext) => {
  const { value } = await ctx.request.body();
  const username = value.get("username");
  const name = value.get("name");
  const password = value.get("password");

  const hashedPassword = hashSync(password);

  const user: User = {
    username,
    name,
    password: hashedPassword,
  };

  users.push(user);
  ctx.response.redirect('/login');
}

export const protectedRoute = async (ctx: RouterContext) => {
  ctx.response.body = await renderFileToString(
    `${Deno.cwd()}/views/protected.ejs`,
    {},
  );
}

export const logout = async (ctx: RouterContext) => {
  ctx.cookies.delete('jwt');
  ctx.response.redirect('/');
}