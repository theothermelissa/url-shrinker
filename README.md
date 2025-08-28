This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). 

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the app in action.


These assumptions informed my approach: 
- Users may create new codes for the same urls, and this is not something we need to check for or guard against. For instance, if this project grew into an analytics-enabled tool similar to bit.ly, a user may wish to create new short codes for the same url in order to track clicks in different places. 
- Users can enter URLs that may or may not be prefaced with `http` or `https`, and the redirect should still work even if they don't. For example, the user can enter "google.com" and the destination url will be created as "http://google.com". I chose non-ssl since there's no reason to punish users who are creating links to non-https destinations. 
- Users can create codes for invalid urls as well. Instead of policing their input, we're allowing them to test their shortened link immediately. 
- The domain for the shortened URL should be configurable with an env var for testing in local or qa environments, and default to the `pro.kp` domain used in the task description. 
- Using the `custom-uuid` library with 8 alphanumeric characters will be sufficient for creating a unique path. This is a two-way door that will be easy to adjust based on team feedback if the expected scope of usage is much higher than expected. 


I kept additional features pretty minimal and user-focused:
- Allow users to copy their newly-created link to the clipboard for easy sharing 
- Allow users to test their link with one click as well, because pasting in the address bar and hitting `enter` is just too many steps. 