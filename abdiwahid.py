#!/usr/bin/env node
/ **
*Full
single - file
Node.js
demo: Quantarix / Citadel - style
OTP
login
website
*Run: node
app.js
*Requirements: Node.js
16 +
* /

const
express = require("express");
const
session = require("express-session");
const
bodyParser = require("body-parser");
const
crypto = require("crypto");

const
app = express();
const
PORT = process.env.PORT | | 3000;

// In - memory
OTP
storage: {email: {code, expiresAt, used}}
const
otpStore = new
Map();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: "change_this_secret",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60}
}));

// Helper
to
generate
6 - digit
code
function
generateOTP()
{
return String(crypto.randomInt(0, 1000000)).padStart(6, "0");
}

// Cleanup
expired
OTPs
setInterval(() = > {
    const
now = Date.now();
for (const[email, data] of otpStore.entries()) {
if (data.expiresAt < now | | data.used)
otpStore.delete(email);
}
}, 60 * 1000);

// HTML
template
function
renderPage(req, message="")
{
const
loggedIn = !!req.session.user;
const
user = req.session.user | | "";
return `
< !doctype
html >
< html
lang = "en" >
< head >
< meta
charset = "utf-8" / >
< meta
name = "viewport"
content = "width=device-width,initial-scale=1" / >
< title > Quantarix - OTP
Demo < / title >
< style >
body
{margin: 0;
font - family: sans - serif;
background:
# 071021;color:#e6eef6;display:flex;justify-content:center;align-items:center;height:100vh}
.card
{background:  # 0b1220;padding:28px;border-radius:14px;box-shadow:0 8px 30px rgba(0,0,0,0.7);width:360px}
     h1{margin - top: 0;
font - size: 20
px}
input
{width: 100 %;
padding: 10
px;
margin: 5
px
0;
border - radius: 6
px;
border: 1
px
solid  # 334;}
button
{padding: 10px;
width: 100 %;
border: none;
border - radius: 8
px;
background:
# 00b3ff;color:#012;font-weight:bold;cursor:pointer}
.msg
{margin: 5px 0;
color:
# f88}
.ok
{color:  # 8ef0b0}
     svg{vertical - align: middle;
margin - right: 10
px}
< / style >
    < / head >
        < body >
        < div


class ="card" >

< div >
< h1 >
< svg
width = "32"
height = "32"
viewBox = "0 0 64 64" >
< rect
width = "64"
height = "64"
rx = "12"
fill = "#003247" / >
< path
d = "M16 44c8-8 16-10 28-18"
stroke = "#fff"
stroke - width = "2.5" / >
< path
d = "M18 28c8-8 18-10 30-6"
stroke = "#fff"
stroke - width = "2.5" / >
< / svg >
Quantarix
< / h1 >
< p
style = "font-size:12px;color:#99a6b3" > Secure
one - time
code
access
demo < / p >
< / div >
${message ? ` < div


class ="msg" > ${message} < / div > `: ""

}
${loggedIn ? `
< p


class ="ok" > Logged in as ${user} < / p >

< form
method = "post"
action = "/logout" > < button
type = "submit" > Sign
out < / button > < / form >
< p > < a
href = "/protected"
style = "color:#00b3ff" > Go
to
protected
page → < / a > < / p >
`: `
< form
method = "post"
action = "/request-otp" >
< label > Email: < / label >
< input
type = "email"
name = "email"
required
placeholder = "you@domain.com" / >
< button
type = "submit" > Request
OTP < / button >
< / form >
< form
method = "post"
action = "/verify-otp"
style = "margin-top:10px" >
< label > Email: < / label >
< input
type = "email"
name = "email"
required
placeholder = "you@domain.com" / >
< label > OTP
code: < / label >
< input
type = "text"
name = "code"
required
maxlength = "6"
placeholder = "123456" / >
< button
type = "submit" > Verify
OTP < / button >
< / form >
`}
< / div >
    < / body >
        < / html >
            `;
}

// Routes
app.get("/", (req, res) = > res.send(renderPage(req)));

app.post("/request-otp", (req, res) = > {
const
email = (req.body.email | | "").trim().toLowerCase();
if (!email) return res.send(renderPage(req, "Enter a valid email"));
const
code = generateOTP();
const
expiresAt = Date.now() + 5 * 60 * 1000;
otpStore.set(email, {code, expiresAt, used: false});
console.log(`OTP for ${email}: ${code}(valid
5
min)`);
res.send(renderPage(req, `OTP
sent
to ${email}.Check
console
for demo code.`));
});

app.post("/verify-otp", (req, res) = > {
const
email = (req.body.email | | "").trim().toLowerCase();
const
code = (req.body.code | | "").trim();
if (!otpStore.has(email)) return res.send(renderPage(req, "No OTP requested for this email"));
const
data = otpStore.get(email);
if (data.used) return res.send(renderPage(req, "This OTP was already used"));
if (data.expiresAt < Date.now()) return res.send(renderPage(req, "OTP expired"));
if (code !==data.code) return res.send(renderPage(req, "Incorrect OTP"));
data.used = true;
req.session.user = email;
res.send(renderPage(req, "Login successful"));
});

app.post("/logout", (req, res) = > {req.session.destroy(() = > res.redirect("/"));});

app.get("/protected", (req, res) = > {
if (!req.session.user) return res.redirect("/");
res.send(` < h2 > Protected
Page < / h2 > < p > Welcome ${req.session.user} < / p > < p > < a
href = "/" > Home < / a > < / p > `);
});

app.listen(PORT, () = > console.log(`🚀 Server
running
at
http: // localhost:${PORT}
`));
# This is a sample Python script.

# Press ⌃R to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.


def print_hi(name):
    # Use a breakpoint in the code line below to debug your script.
    print(f'Hi, {name}')  # Press ⌘F8 to toggle the breakpoint.


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    print_hi('PyCharm')

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
