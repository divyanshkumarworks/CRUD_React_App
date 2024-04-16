import { Helmet } from 'react-helmet-async';

import { SigninView } from 'src/sections/signin';

// ----------------------------------------------------------------------

export default function SignInPage() {
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <SigninView />
    </>
  );
}
