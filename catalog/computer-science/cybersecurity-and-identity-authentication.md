# Cybersecurity and Identity Authentication

[← Computer Science](../../README.md#computer-science) · [Complete index](../INDEX.md)

15 videos · 0 awaiting production

Course bibliography supplied by the source list: Primary references listed per concept. Specific supporting references are listed per concept; missing references are not inferred.

Course download package: not yet published.

[Explore Leadde animation tools](https://leadde.ai/animation). Copy an aligned prompt, open a suitable tool, then adapt it manually; exact reproduction is not promised.

---

<a id="recvw25tezjpux"></a>
## Authentication and Authorization Boundary

`recvw25tEzjpUx` · Video available · review: **passed** · version `v1`

**Learn:** Distinguish identity verification from permission decisions for the same signed-in person.
**Takeaway:** A verified identity still needs permission for each requested action.

https://github.com/user-attachments/assets/e1e12ca3-774b-4c69-ac41-a7f05cb97239

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cybersecurity-and-identity-authentication/authentication-and-authorization-boundary.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Prompt follows approved v1 production.scenes and its 30-second timeline. Cover depicts the same core mechanism without introducing a new scenario. Final source mechanism and terminology retained. Source kit is provided; external runtime dependencies and exact-reproduction limits are disclosed in the prompt.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second, silent, English, 1920×1080, 30 fps educational animation for Authentication and Authorization Boundary. Use the final approved v1 source and course kit. Teaching objective: Distinguish identity verification from permission decisions for the same signed-in person. Core conclusion: A verified identity still needs permission for each requested action. Keep the course layout with explanatory text on the left and a large mechanism diagram on the right. Animate actual objects and causal state changes. Timeline: 0–7 s: Maya card moves through identity gate; a verified check appears without opening resource doors. 7–15 s: READ packet leaves Maya, meets policy marker, and enters the opened report door; report page expands. 15–24 s: DELETE packet takes a separate lower route and stops at a closed permission gate; report stays intact. 24–30 s: Two routes resolve simultaneously into green READ and red DELETE outcomes; a boundary line brackets the per-action checks.

Use this literal palette: background #070b12, panels #0d1626 and #142238, primary #60a5fa, accent #fbbf24, result #34d399, warning #f87171, text #f8fafc, muted text #94a3b8. Typography: Helvetica Neue, Helvetica, Arial, Segoe UI, sans-serif. Render with Remotion 4.0.410, React 19, TypeScript 5.8 and FFmpeg. The source kit will be provided, including the course theme and reusable Security primitives. Node, Chromium and system fonts are external dependencies. Preserve the final source timeline, diagram positions and output specifications. Clean-environment exact reproduction has not been verified.
````

</details>

**Production:** Remotion; dependencies: remotion 4.0.410, React 19, TypeScript 5.8, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/source-kits/cybersecurity-and-identity-authentication.zip)

- [Concept reference](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) — Terminology and mechanism grounding

[Back to course top](#cybersecurity-and-identity-authentication)

---

<a id="recvw25tezebva"></a>
## Password Hashing with Salt

`recvw25tEzEbVA` · Video available · review: **passed** · version `v2`

**Learn:** Explain why equal passwords can have different stored verifiers and how login recomputes the correct verifier.
**Takeaway:** A unique random salt changes each stored password hash; verification reuses that account’s salt.

https://github.com/user-attachments/assets/16b28dff-2d4a-461d-a0cb-10154431775d

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cybersecurity-and-identity-authentication/password-hashing-with-salt.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Prompt follows approved v2 production.scenes and its 30-second timeline. Cover depicts the same core mechanism without introducing a new scenario. Includes salt/verifier database ingress and plaintext disappearance. Source kit is provided; external runtime dependencies and exact-reproduction limits are disclosed in the prompt.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second, silent, English, 1920×1080, 30 fps educational animation for Password Hashing with Salt. Use the final approved v2 source and course kit. Teaching objective: Explain why equal passwords can have different stored verifiers and how login recomputes the correct verifier. Core conclusion: A unique random salt changes each stored password hash; verification reuses that account’s salt. Keep the course layout with explanatory text on the left and a large mechanism diagram on the right. Animate actual objects and causal state changes. Timeline: 0–6 s: Two equal password tiles align vertically; equal symbols appear between them. 6–14 s: Distinct salt tiles enter separate password KDF machines with equal passwords; different verifier patterns emerge. 14–20 s: A database with separate Salt and Verifier columns appears. Both salt and verifier tiles move into account rows while the plaintext password and KDF tiles fade away; the database contains no plaintext password. 20–30 s: Stored salt A travels back into the KDF with the login input; computed verifier aligns with stored A and the match check lights.

Use this literal palette: background #070b12, panels #0d1626 and #142238, primary #60a5fa, accent #fbbf24, result #34d399, warning #f87171, text #f8fafc, muted text #94a3b8. Typography: Helvetica Neue, Helvetica, Arial, Segoe UI, sans-serif. Render with Remotion 4.0.410, React 19, TypeScript 5.8 and FFmpeg. The source kit will be provided, including the course theme and reusable Security primitives. Node, Chromium and system fonts are external dependencies. Preserve the final source timeline, diagram positions and output specifications. Clean-environment exact reproduction has not been verified.
````

</details>

**Production:** Remotion; dependencies: remotion 4.0.410, React 19, TypeScript 5.8, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/source-kits/cybersecurity-and-identity-authentication.zip)

- [Concept reference](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) — Terminology and mechanism grounding

[Back to course top](#cybersecurity-and-identity-authentication)

---

<a id="recvw25tezxx6p"></a>
## Public-Key Challenge-Response Authentication

`recvw25tEzxx6p` · Video available · review: **passed** · version `v1`

**Learn:** Trace fresh challenge signing and public-key verification without sending a private key.
**Takeaway:** A fresh challenge is signed with the private key and verified with the registered public key.

https://github.com/user-attachments/assets/a83763cf-e9ec-4022-8784-30d5b2d06ea8

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cybersecurity-and-identity-authentication/public-key-challenge-response-authentication.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Prompt follows approved v1 production.scenes and its 30-second timeline. Cover depicts the same core mechanism without introducing a new scenario. Final source mechanism and terminology retained. Source kit is provided; external runtime dependencies and exact-reproduction limits are disclosed in the prompt.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second, silent, English, 1920×1080, 30 fps educational animation for Public-Key Challenge-Response Authentication. Use the final approved v1 source and course kit. Teaching objective: Trace fresh challenge signing and public-key verification without sending a private key. Core conclusion: A fresh challenge is signed with the private key and verified with the registered public key. Keep the course layout with explanatory text on the left and a large mechanism diagram on the right. Animate actual objects and causal state changes. Timeline: 0–6 s: Private key locks inside device vault while matching public key is visible at server. 6–13 s: Challenge C42 moves from server to device and is inserted into signing area beside the fixed private key. 13–21 s: A signature tile grows from signing operation and returns to server; the private key never crosses the enclosure. 21–30 s: Current signature docks with C42 and public key and earns a check; faded old C17 signature approaches and is rejected by the current-challenge slot.

Use this literal palette: background #070b12, panels #0d1626 and #142238, primary #60a5fa, accent #fbbf24, result #34d399, warning #f87171, text #f8fafc, muted text #94a3b8. Typography: Helvetica Neue, Helvetica, Arial, Segoe UI, sans-serif. Render with Remotion 4.0.410, React 19, TypeScript 5.8 and FFmpeg. The source kit will be provided, including the course theme and reusable Security primitives. Node, Chromium and system fonts are external dependencies. Preserve the final source timeline, diagram positions and output specifications. Clean-environment exact reproduction has not been verified.
````

</details>

**Production:** Remotion; dependencies: remotion 4.0.410, React 19, TypeScript 5.8, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/source-kits/cybersecurity-and-identity-authentication.zip)

- [Concept reference](https://www.w3.org/TR/webauthn-3/#sctn-cryptographic-challenges) — Terminology and mechanism grounding

[Back to course top](#cybersecurity-and-identity-authentication)

---

<a id="recvw25tezfouf"></a>
## OAuth 2.0 Authorization Code Flow

`recvw25tEzFOUF` · Video available · review: **passed** · version `v2`

**Learn:** Follow browser redirects and the separate code-for-token exchange.
**Takeaway:** The browser carries an authorization code; the client exchanges it for an access token.

https://github.com/user-attachments/assets/689010a3-4d3e-4d09-9cf3-754a0174e546

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cybersecurity-and-identity-authentication/oauth-20-authorization-code-flow.mp4) · 32.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Prompt follows approved v2 production.scenes and its 32-second timeline. Cover depicts the same core mechanism without introducing a new scenario. Includes token delivery to Photo API followed by returning photos. Source kit is provided; external runtime dependencies and exact-reproduction limits are disclosed in the prompt.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 32-second, silent, English, 1920×1080, 30 fps educational animation for OAuth 2.0 Authorization Code Flow. Use the final approved v2 source and course kit. Teaching objective: Follow browser redirects and the separate code-for-token exchange. Core conclusion: The browser carries an authorization code; the client exchanges it for an access token. Keep the course layout with explanatory text on the left and a large mechanism diagram on the right. Animate actual objects and causal state changes. Timeline: 0–8 s: The Request + PKCE tile follows the client-to-authorization-server redirect arc below the Browser label; Browser redirects label is above the browser to keep text distinct. 8–15 s: Consent check appears; a short CODE C1 ticket moves along browser redirect path back to the client. 15–24 s: Client sends CODE C1 and verifier along a distinct lower direct channel; code turns consumed as an ACCESS TOKEN returns. 24–32 s: The view switches to Client and Photo API. The access token moves from client to API along the upper request route. Only after the API token-accepted check appears do three photo cards return along a separate lower route to the client.

Use this literal palette: background #070b12, panels #0d1626 and #142238, primary #60a5fa, accent #fbbf24, result #34d399, warning #f87171, text #f8fafc, muted text #94a3b8. Typography: Helvetica Neue, Helvetica, Arial, Segoe UI, sans-serif. Render with Remotion 4.0.410, React 19, TypeScript 5.8 and FFmpeg. The source kit will be provided, including the course theme and reusable Security primitives. Node, Chromium and system fonts are external dependencies. Preserve the final source timeline, diagram positions and output specifications. Clean-environment exact reproduction has not been verified.
````

</details>

**Production:** Remotion; dependencies: remotion 4.0.410, React 19, TypeScript 5.8, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/source-kits/cybersecurity-and-identity-authentication.zip)

- [Concept reference](https://www.rfc-editor.org/rfc/rfc6749#section-4.1) — Terminology and mechanism grounding
- [Concept reference](https://www.rfc-editor.org/rfc/rfc7636) — Terminology and mechanism grounding

[Back to course top](#cybersecurity-and-identity-authentication)

---

<a id="recvw25tezopdr"></a>
## OpenID Connect ID Token Validation

`recvw25tEzOpDR` · Video available · review: **passed** · version `v1`

**Learn:** Explain why valid signature alone is insufficient before trusting an ID Token.
**Takeaway:** Validate issuer, audience, expiry and request binding as well as the signature before accepting identity.

https://github.com/user-attachments/assets/4de20018-fd13-49eb-b2c6-612355ad98fc

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cybersecurity-and-identity-authentication/openid-connect-id-token-validation.mp4) · 31.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Prompt follows approved v1 production.scenes and its 31-second timeline. Cover depicts the same core mechanism without introducing a new scenario. Final source mechanism and terminology retained. Source kit is provided; external runtime dependencies and exact-reproduction limits are disclosed in the prompt.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 31-second, silent, English, 1920×1080, 30 fps educational animation for OpenID Connect ID Token Validation. Use the final approved v1 source and course kit. Teaching objective: Explain why valid signature alone is insufficient before trusting an ID Token. Core conclusion: Validate issuer, audience, expiry and request binding as well as the signature before accepting identity. Keep the course layout with explanatory text on the left and a large mechanism diagram on the right. Animate actual objects and causal state changes. Timeline: 0–6 s: Token card opens to reveal issuer, audience, expiry and nonce rows; Maya silhouette stays gray. 6–13 s: Trusted issuer key activates envelope verification; signature badge turns green while identity remains gray. 13–23 s: A scanning rail visits issuer, audience, expiry and nonce; each row aligns with expected client context and changes to green. 23–31 s: Two token cards separate; original goes to accepted Maya identity while changed-audience token stops in a red lane despite retaining a green signature badge.

Use this literal palette: background #070b12, panels #0d1626 and #142238, primary #60a5fa, accent #fbbf24, result #34d399, warning #f87171, text #f8fafc, muted text #94a3b8. Typography: Helvetica Neue, Helvetica, Arial, Segoe UI, sans-serif. Render with Remotion 4.0.410, React 19, TypeScript 5.8 and FFmpeg. The source kit will be provided, including the course theme and reusable Security primitives. Node, Chromium and system fonts are external dependencies. Preserve the final source timeline, diagram positions and output specifications. Clean-environment exact reproduction has not been verified.
````

</details>

**Production:** Remotion; dependencies: remotion 4.0.410, React 19, TypeScript 5.8, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/source-kits/cybersecurity-and-identity-authentication.zip)

- [Concept reference](https://openid.net/specs/openid-connect-core-1_0.html#IDTokenValidation) — Terminology and mechanism grounding

[Back to course top](#cybersecurity-and-identity-authentication)

---

<a id="recvw25tezq1bc"></a>
## WebAuthn Passkey Registration

`recvw25tEzQ1BC` · Video available · review: **passed** · version `v1`

**Learn:** Trace how consent creates a relying-party scoped key pair and how verified public credential data becomes an account credential.
**Takeaway:** Registration stores a verified public key at the website; the private key is not sent to that website.

https://github.com/user-attachments/assets/a8b368fc-7c52-41ee-9922-79c0b9aa5698

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cybersecurity-and-identity-authentication/webauthn-passkey-registration.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Checked final TSX SceneDef durations and frame-derived Stage/Mechanism timing against the approved final record and media duration. Four scenes total 900 frames / 30.0 seconds; the prompt names the actual illustrated objects, state changes, timing, course palette and two-column layout. No generic replacement story was introduced. Source kit is provided; external runtime dependencies and exact-reproduction limits are disclosed in the prompt.

<details>
<summary>View and copy Prompt</summary>

````text
Create a silent English educational animation about WebAuthn Passkey Registration. 0–6 s: the server sends challenge C1 to the browser for example.com. 6–14 s: user consent creates a key pair; the private key stays inside the authenticator and the public key moves toward the website. 14–23 s: show sequential challenge, origin and relying-party checks; store credential ID and public key only after the checks, at 21 s. 23–30 s: hold the separated private and public roles with the completed account record. Do not imply that passkeys can never synchronize; show only that the website does not receive the private key.

Use the supplied cybersecurity-identity source kit with Remotion 4.0.410, React 19, TypeScript 5.8 and FFmpeg. Render a silent 30.0-second H.264 MP4 at 1920×1080, 30 fps, 900 frames. Preserve the left text/right diagram composition: left copy starts near x=108, and the 1000×700 SVG diagram sits at x=840, y=165. Use the literal dark palette bg0 #070b12, bg1 #0d1626, bg2 #142238, primary #60a5fa, accent #fbbf24, result #34d399, warning #f87171, text #f8fafc and muted text #94a3b8; grid rgba(148,163,184,0.13). Typography is "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif. Use frame-derived state for diagram motion, captions and outcomes, and retain readable whole-line English labels and short scene fades. The source kit is provided; Node.js, Chromium and system fonts are external dependencies. Exact reproduction in a clean environment has not been verified.
````

</details>

**Production:** Remotion; dependencies: remotion 4.0.410, React 19, TypeScript 5.8, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/source-kits/cybersecurity-and-identity-authentication.zip)

- [Concept reference](https://www.w3.org/TR/webauthn-3/#sctn-registering-a-new-credential) — Terminology and mechanism grounding

[Back to course top](#cybersecurity-and-identity-authentication)

---

<a id="recvw25tezhssr"></a>
## Multi-Factor Authentication TOTP

`recvw25tEzHsSR` · Video available · review: **passed** · version `v1`

**Learn:** Explain the time-step derived one-time code as a possession factor paired with a password.
**Takeaway:** Shared secret and matching time steps yield a verifiable one-time code; the secret itself is not submitted at login.

https://github.com/user-attachments/assets/ae0ee26f-5062-4b32-91b9-e104130d83da

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cybersecurity-and-identity-authentication/multi-factor-authentication-totp.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Checked final TSX SceneDef durations and frame-derived Stage/Mechanism timing against the approved final record and media duration. Four scenes total 900 frames / 30.0 seconds; the prompt names the actual illustrated objects, state changes, timing, course palette and two-column layout. No generic replacement story was introduced. Source kit is provided; external runtime dependencies and exact-reproduction limits are disclosed in the prompt.

<details>
<summary>View and copy Prompt</summary>

````text
Create a silent English educational animation about Multi-Factor Authentication TOTP. 0–5 s: password knowledge passes but the account still needs an authenticator code. 5–13 s: two aligned 30-second time-step strips cross the same boundary, changing T=100 to T=101 together while K stays local. 13–23 s: the phone and verifier compute matching illustrative code 482913; only the code crosses the channel, and the match is accepted once at 20 s. 23–30 s: an already-used 482913 is rejected; at 28 s a new step changes both generated codes to illustrative 735204 while the old replay remains rejected. Preserve the configured verifier time-window explanation rather than claiming an exact universal expiry boundary.

Use the supplied cybersecurity-identity source kit with Remotion 4.0.410, React 19, TypeScript 5.8 and FFmpeg. Render a silent 30.0-second H.264 MP4 at 1920×1080, 30 fps, 900 frames. Preserve the left text/right diagram composition: left copy starts near x=108, and the 1000×700 SVG diagram sits at x=840, y=165. Use the literal dark palette bg0 #070b12, bg1 #0d1626, bg2 #142238, primary #60a5fa, accent #fbbf24, result #34d399, warning #f87171, text #f8fafc and muted text #94a3b8; grid rgba(148,163,184,0.13). Typography is "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif. Use frame-derived state for diagram motion, captions and outcomes, and retain readable whole-line English labels and short scene fades. The source kit is provided; Node.js, Chromium and system fonts are external dependencies. Exact reproduction in a clean environment has not been verified.
````

</details>

**Production:** Remotion; dependencies: remotion 4.0.410, React 19, TypeScript 5.8, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/source-kits/cybersecurity-and-identity-authentication.zip)

- [Concept reference](https://www.rfc-editor.org/rfc/rfc6238) — Terminology and mechanism grounding
- [Concept reference](https://www.rfc-editor.org/rfc/rfc4226) — Terminology and mechanism grounding

[Back to course top](#cybersecurity-and-identity-authentication)

---

<a id="recvw25tezvmaf"></a>
## Session Cookie Secure Attributes

`recvw25tEzVmaf` · Video available · review: **passed** · version `v1`

**Learn:** Distinguish Secure, HttpOnly and SameSite using three different attempted paths for one session cookie.
**Takeaway:** Secure restricts transport, HttpOnly restricts script access, and SameSite restricts cross-site attachment.

https://github.com/user-attachments/assets/6a87c327-0f0c-4843-a5ad-15a32d932e9a

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cybersecurity-and-identity-authentication/session-cookie-secure-attributes.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Checked final TSX SceneDef durations and frame-derived Stage/Mechanism timing against the approved final record and media duration. Four scenes total 900 frames / 30.0 seconds; the prompt names the actual illustrated objects, state changes, timing, course palette and two-column layout. No generic replacement story was introduced. Source kit is provided; external runtime dependencies and exact-reproduction limits are disclosed in the prompt.

<details>
<summary>View and copy Prompt</summary>

````text
Create a silent English educational animation about Session Cookie Secure Attributes. 0–5 s: place sid in a browser cookie jar with Secure, HttpOnly and SameSite=Strict. 5–12 s: both HTTP and HTTPS requests travel, but only HTTPS carries sid. 12–20 s: stop a script read at the HttpOnly barrier while an eligible HTTPS fetch carries sid. 20–30 s: move same-site and cross-site requests in parallel, attaching sid only to the same-site request. Cookie withholding does not stop the request itself; these three attributes govern separate behaviors.

Use the supplied cybersecurity-identity source kit with Remotion 4.0.410, React 19, TypeScript 5.8 and FFmpeg. Render a silent 30.0-second H.264 MP4 at 1920×1080, 30 fps, 900 frames. Preserve the left text/right diagram composition: left copy starts near x=108, and the 1000×700 SVG diagram sits at x=840, y=165. Use the literal dark palette bg0 #070b12, bg1 #0d1626, bg2 #142238, primary #60a5fa, accent #fbbf24, result #34d399, warning #f87171, text #f8fafc and muted text #94a3b8; grid rgba(148,163,184,0.13). Typography is "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif. Use frame-derived state for diagram motion, captions and outcomes, and retain readable whole-line English labels and short scene fades. The source kit is provided; Node.js, Chromium and system fonts are external dependencies. Exact reproduction in a clean environment has not been verified.
````

</details>

**Production:** Remotion; dependencies: remotion 4.0.410, React 19, TypeScript 5.8, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/source-kits/cybersecurity-and-identity-authentication.zip)

- [Concept reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie) — Terminology and mechanism grounding

[Back to course top](#cybersecurity-and-identity-authentication)

---

<a id="recvw25tezdrpi"></a>
## JSON Web Token Signature Verification

`recvw25tEzdrPi` · Video available · review: **passed** · version `v1`

**Learn:** Show why readable JWT claims still require signature validation over the original encoded header and payload.
**Takeaway:** A valid signature binds the encoded header and payload to a trusted key; changing the payload breaks that validation.

https://github.com/user-attachments/assets/8ec94717-69da-49e9-9b0b-84fd856d2ab5

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cybersecurity-and-identity-authentication/json-web-token-signature-verification.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Checked final TSX SceneDef durations and frame-derived Stage/Mechanism timing against the approved final record and media duration. Four scenes total 900 frames / 30.0 seconds; the prompt names the actual illustrated objects, state changes, timing, course palette and two-column layout. No generic replacement story was introduced. Source kit is provided; external runtime dependencies and exact-reproduction limits are disclosed in the prompt.

<details>
<summary>View and copy Prompt</summary>

````text
Create a silent English educational animation about JSON Web Token Signature Verification. 0–6 s: separate encoded header, payload and signature; decode role=user while retaining the unverified status. 6–15 s: send original encoded header and payload to a verifier with the configured expected algorithm, trusted issuer public key and signature; mark the signature valid at 12 s. 15–24 s: change role=user to role=admin at 18 s while keeping the original signature; reject it at 21 s. 24–30 s: keep the tampered branch rejected and show the original token passing signature, issuer, audience and expiry checks before acceptance. A signed JWT is readable, not confidential merely because it is signed.

Use the supplied cybersecurity-identity source kit with Remotion 4.0.410, React 19, TypeScript 5.8 and FFmpeg. Render a silent 30.0-second H.264 MP4 at 1920×1080, 30 fps, 900 frames. Preserve the left text/right diagram composition: left copy starts near x=108, and the 1000×700 SVG diagram sits at x=840, y=165. Use the literal dark palette bg0 #070b12, bg1 #0d1626, bg2 #142238, primary #60a5fa, accent #fbbf24, result #34d399, warning #f87171, text #f8fafc and muted text #94a3b8; grid rgba(148,163,184,0.13). Typography is "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif. Use frame-derived state for diagram motion, captions and outcomes, and retain readable whole-line English labels and short scene fades. The source kit is provided; Node.js, Chromium and system fonts are external dependencies. Exact reproduction in a clean environment has not been verified.
````

</details>

**Production:** Remotion; dependencies: remotion 4.0.410, React 19, TypeScript 5.8, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/source-kits/cybersecurity-and-identity-authentication.zip)

- [Concept reference](https://www.rfc-editor.org/rfc/rfc7515#section-5.2) — Terminology and mechanism grounding
- [Concept reference](https://www.rfc-editor.org/rfc/rfc8725#section-3.1) — Terminology and mechanism grounding

[Back to course top](#cybersecurity-and-identity-authentication)

---

<a id="recvw25tezt9tq"></a>
## Refresh Token Rotation

`recvw25tEzt9tQ` · Video available · review: **passed** · version `v1`

**Learn:** Trace replacement of a refresh token and show how reuse of its invalidated predecessor reveals compromise.
**Takeaway:** Each successful refresh replaces its refresh token; reuse of an invalidated predecessor triggers detection and revocation of the active token family.

https://github.com/user-attachments/assets/8f828773-2f49-467b-93a4-33e178a5160a

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cybersecurity-and-identity-authentication/refresh-token-rotation.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Checked final TSX SceneDef durations and frame-derived Stage/Mechanism timing against the approved final record and media duration. Four scenes total 900 frames / 30.0 seconds; the prompt names the actual illustrated objects, state changes, timing, course palette and two-column layout. No generic replacement story was introduced. Source kit is provided; external runtime dependencies and exact-reproduction limits are disclosed in the prompt.

<details>
<summary>View and copy Prompt</summary>

````text
Create a silent English educational animation about Refresh Token Rotation. 0–5 s: show the client holding R0, the server ledger marking R0 active, and a stolen copy. 5–14 s: submit R0, change its ledger state to spent at 9 s, then return access token A1 and replacement refresh token R1 linked in the token family. 14–23 s: send stolen R0 from the attacker; recognize its reuse at 20 s and trace the retained relationship to R1. 23–30 s: revoke R1 at 24 s, block the legitimate client’s R1 retry, and direct it to sign in again. The server detects reuse without identifying which presenter was the legitimate client.

Use the supplied cybersecurity-identity source kit with Remotion 4.0.410, React 19, TypeScript 5.8 and FFmpeg. Render a silent 30.0-second H.264 MP4 at 1920×1080, 30 fps, 900 frames. Preserve the left text/right diagram composition: left copy starts near x=108, and the 1000×700 SVG diagram sits at x=840, y=165. Use the literal dark palette bg0 #070b12, bg1 #0d1626, bg2 #142238, primary #60a5fa, accent #fbbf24, result #34d399, warning #f87171, text #f8fafc and muted text #94a3b8; grid rgba(148,163,184,0.13). Typography is "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif. Use frame-derived state for diagram motion, captions and outcomes, and retain readable whole-line English labels and short scene fades. The source kit is provided; Node.js, Chromium and system fonts are external dependencies. Exact reproduction in a clean environment has not been verified.
````

</details>

**Production:** Remotion; dependencies: remotion 4.0.410, React 19, TypeScript 5.8, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/source-kits/cybersecurity-and-identity-authentication.zip)

- [Concept reference](https://www.rfc-editor.org/rfc/rfc9700#section-4.14.2) — Terminology and mechanism grounding

[Back to course top](#cybersecurity-and-identity-authentication)

---

<a id="recvw25tezw5wp"></a>
## Role-Based Access Control

`recvw25tEzw5wp` · Video available · review: **passed** · version `v2`

**Learn:** Trace a user’s effective permissions through an assigned and activated role.
**Takeaway:** Permissions attach to roles; an active assigned role mediates the user’s operations.

https://github.com/user-attachments/assets/7f374efb-6696-452f-9ee8-5b0a136a5c40

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cybersecurity-and-identity-authentication/role-based-access-control.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Aligned to the final reviewed v2 TSX and 30-second scene timeline. Describes concrete graphical changes instead of claiming word-for-word execution of every early L3 detail. Palette and runtime versions read from the actual course kit. Complete kit is supplied; external dependencies and unverified clean-environment exact reproduction are explicitly disclosed. Source kit is provided; external runtime dependencies and exact-reproduction limits are disclosed in the prompt.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second educational animation of Role-Based Access Control. 0–6 s: establish Maya, Analyst and Administrator roles, and Read/Delete permission nodes; draw Maya’s Analyst assignment. 6–12 s: activate Analyst, move a read request through its valid path, and open a report page below the operation nodes. 12–20 s: move a delete request down the missing-permission path and stop it; retain DELETE DENIED. 20–30 s: explicitly assign and activate Administrator, move a fresh delete request along the valid role-permission edge and remove the report. The central conclusion is: Permissions attach to roles; an active assigned role mediates the user’s operations.

Render a silent English 1920×1080, 16:9 MP4 at 30 fps. Use a left text column and a distinct right SVG diagram (1000×700 at x840,y165), with generous separation between headings, explanatory lines and the bottom takeaway. Use the literal palette: background #070b12, panels #0d1626 and #142238, primary #60a5fa, accent #fbbf24, successful results #34d399, denial/revocation #f87171, strong text #f8fafc and secondary text #94a3b8. Use Helvetica Neue, Helvetica, Arial, Segoe UI, sans-serif; animate whole labels and causal objects rather than individual letters. Keep node labels legible and unobscured. The supplied course kit is the source basis, using Remotion 4.0.410, React 19, TypeScript 5.8 and FFmpeg. Node.js, Chromium and installed system fonts are external dependencies; clean-environment exact reproduction has not been verified.
````

</details>

**Production:** Remotion; dependencies: remotion 4.0.410, React 19, TypeScript 5.8, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/source-kits/cybersecurity-and-identity-authentication.zip)

- [Concept reference](https://csrc.nist.gov/Projects/role-based-access-control/faqs) — Terminology and mechanism grounding

[Back to course top](#cybersecurity-and-identity-authentication)

---

<a id="recvw25tezkhzg"></a>
## Attribute-Based Access Control

`recvw25tEzKHzG` · Video available · review: **passed** · version `v1`

**Learn:** Evaluate subject, resource, action and environment attributes against one explicit policy.
**Takeaway:** A policy decision can change when an attribute changes, even for the same user and resource.

https://github.com/user-attachments/assets/8d018955-73a0-488d-8d99-2cce9bcfa896

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cybersecurity-and-identity-authentication/attribute-based-access-control.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Aligned to the final reviewed v1 TSX and 30-second scene timeline. Describes concrete graphical changes instead of claiming word-for-word execution of every early L3 detail. Palette and runtime versions read from the actual course kit. Complete kit is supplied; external dependencies and unverified clean-environment exact reproduction are explicitly disclosed. Source kit is provided; external runtime dependencies and exact-reproduction limits are disclosed in the prompt.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second educational animation of Attribute-Based Access Control. 0–7 s: connect Nina: Finance and Report: Finance to the department comparator and combine that predicate with managed-device status using an AND gate. 7–14 s: animate the passing evaluation and reveal an opened report. 14–23 s: slide the device toggle to unmanaged, preserve the department match, turn the device predicate false, and evaluate a new READ request; show DENY only after its packet arrives. 23–30 s: separate the TRUE department and FALSE device tiles, feed both into AND and stop a new red request at the denied result. The central conclusion is: A policy decision can change when an attribute changes, even for the same user and resource.

Render a silent English 1920×1080, 16:9 MP4 at 30 fps. Use a left text column and a distinct right SVG diagram (1000×700 at x840,y165), with generous separation between headings, explanatory lines and the bottom takeaway. Use the literal palette: background #070b12, panels #0d1626 and #142238, primary #60a5fa, accent #fbbf24, successful results #34d399, denial/revocation #f87171, strong text #f8fafc and secondary text #94a3b8. Use Helvetica Neue, Helvetica, Arial, Segoe UI, sans-serif; animate whole labels and causal objects rather than individual letters. Keep node labels legible and unobscured. The supplied course kit is the source basis, using Remotion 4.0.410, React 19, TypeScript 5.8 and FFmpeg. Node.js, Chromium and installed system fonts are external dependencies; clean-environment exact reproduction has not been verified.
````

</details>

**Production:** Remotion; dependencies: remotion 4.0.410, React 19, TypeScript 5.8, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/source-kits/cybersecurity-and-identity-authentication.zip)

- [Concept reference](https://csrc.nist.gov/pubs/sp/800/162/upd2/final) — Terminology and mechanism grounding

[Back to course top](#cybersecurity-and-identity-authentication)

---

<a id="recvw25tezy3ho"></a>
## SAML Service Provider Login Flow

`recvw25tEzy3Ho` · Video available · review: **passed** · version `v1`

**Learn:** Follow one service-provider-initiated SAML login through the browser and identity provider.
**Takeaway:** The service provider creates a session only after validating the returned SAML response and assertion.

https://github.com/user-attachments/assets/83f4b3ab-d415-421a-bd10-5aa0bfa77c6a

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cybersecurity-and-identity-authentication/saml-service-provider-login-flow.mp4) · 31.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Aligned to the final reviewed v1 TSX and 31-second scene timeline. Describes concrete graphical changes instead of claiming word-for-word execution of every early L3 detail. Palette and runtime versions read from the actual course kit. Complete kit is supplied; external dependencies and unverified clean-environment exact reproduction are explicitly disclosed. Source kit is provided; external runtime dependencies and exact-reproduction limits are disclosed in the prompt.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 31-second educational animation of SAML Service Provider Login Flow. 0–6 s: show Browser, Service provider and Identity provider lanes; send the application request to the service and return AuthnRequest to the browser. 6–13 s: relay the browser redirect to the identity provider and show the user authenticating there. 13–21 s: move Signed SAMLResponse from identity provider to browser, pause, then send browser HTTP POST to the service provider. 21–31 s: replace the relay view with signature, audience, validity-window and request-correlation checks, then reveal the application session only after validation. The central conclusion is: The service provider creates a session only after validating the returned SAML response and assertion.

Render a silent English 1920×1080, 16:9 MP4 at 30 fps. Use a left text column and a distinct right SVG diagram (1000×700 at x840,y165), with generous separation between headings, explanatory lines and the bottom takeaway. Use the literal palette: background #070b12, panels #0d1626 and #142238, primary #60a5fa, accent #fbbf24, successful results #34d399, denial/revocation #f87171, strong text #f8fafc and secondary text #94a3b8. Use Helvetica Neue, Helvetica, Arial, Segoe UI, sans-serif; animate whole labels and causal objects rather than individual letters. Keep node labels legible and unobscured. The supplied course kit is the source basis, using Remotion 4.0.410, React 19, TypeScript 5.8 and FFmpeg. Node.js, Chromium and installed system fonts are external dependencies; clean-environment exact reproduction has not been verified.
````

</details>

**Production:** Remotion; dependencies: remotion 4.0.410, React 19, TypeScript 5.8, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/source-kits/cybersecurity-and-identity-authentication.zip)

- [Concept reference](https://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0-cd-02.html) — Terminology and mechanism grounding

[Back to course top](#cybersecurity-and-identity-authentication)

---

<a id="recvw25tezxacy"></a>
## Mutual TLS Certificate Authentication

`recvw25tEzxAcY` · Video available · review: **passed** · version `v2`

**Learn:** Distinguish exchanged certificates from proof that each endpoint possesses its private key.
**Takeaway:** Mutual TLS authenticates both peers using certificate validation and private-key possession proofs.

https://github.com/user-attachments/assets/5b23e5b3-7fa0-4fb7-9a64-cb86b667c617

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cybersecurity-and-identity-authentication/mutual-tls-certificate-authentication.mp4) · 31.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Aligned to the final reviewed v2 TSX and 31-second scene timeline. Describes concrete graphical changes instead of claiming word-for-word execution of every early L3 detail. Palette and runtime versions read from the actual course kit. Complete kit is supplied; external dependencies and unverified clean-environment exact reproduction are explicitly disclosed. Source kit is provided; external runtime dependencies and exact-reproduction limits are disclosed in the prompt.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 31-second educational animation of Mutual TLS Certificate Authentication. 0–6 s: show a client, server and two fixed private-key boxes; move ClientHello toward the server. 6–14 s: transfer the server certificate and possession proof to the client, validate certificate and signature, show the client-certificate request and Server Finished verified. 14–23 s: move only the client certificate and proof toward the server while both private keys remain local; show client verification after arrival. 23–31 s: present an explicitly labeled key-handshake-steps schematic with both Finished verifications already complete, then move protected application data through the established channel. Do not draw a reversed chronological pair of Finished messages. The central conclusion is: Mutual TLS authenticates both peers using certificate validation and private-key possession proofs.

Render a silent English 1920×1080, 16:9 MP4 at 30 fps. Use a left text column and a distinct right SVG diagram (1000×700 at x840,y165), with generous separation between headings, explanatory lines and the bottom takeaway. Use the literal palette: background #070b12, panels #0d1626 and #142238, primary #60a5fa, accent #fbbf24, successful results #34d399, denial/revocation #f87171, strong text #f8fafc and secondary text #94a3b8. Use Helvetica Neue, Helvetica, Arial, Segoe UI, sans-serif; animate whole labels and causal objects rather than individual letters. Keep node labels legible and unobscured. The supplied course kit is the source basis, using Remotion 4.0.410, React 19, TypeScript 5.8 and FFmpeg. Node.js, Chromium and installed system fonts are external dependencies; clean-environment exact reproduction has not been verified.
````

</details>

**Production:** Remotion; dependencies: remotion 4.0.410, React 19, TypeScript 5.8, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/source-kits/cybersecurity-and-identity-authentication.zip)

- [Concept reference](https://www.rfc-editor.org/rfc/rfc8446.html) — Terminology and mechanism grounding

[Back to course top](#cybersecurity-and-identity-authentication)

---

<a id="recvw25tez3sof"></a>
## Least-Privilege Access Review

`recvw25tEz3sOf` · Video available · review: **passed** · version `v1`

**Learn:** Compare a user’s current privileges with present duties, then remove privileges no longer justified.
**Takeaway:** An access review preserves necessary privileges and removes excess access based on current duties.

https://github.com/user-attachments/assets/cf7b4cb0-f42a-445f-9ddd-d0047949ef7a

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cybersecurity-and-identity-authentication/least-privilege-access-review.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Aligned to the final reviewed v1 TSX and 30-second scene timeline. Describes concrete graphical changes instead of claiming word-for-word execution of every early L3 detail. Palette and runtime versions read from the actual course kit. Complete kit is supplied; external dependencies and unverified clean-environment exact reproduction are explicitly disclosed. Source kit is provided; external runtime dependencies and exact-reproduction limits are disclosed in the prompt.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second educational animation of Least-Privilege Access Review. 0–7 s: draw three granted-access branches from a report reader to Read reports, Export all data and Admin settings, alongside the current report-reading duty. 7–15 s: compare the privileges with the duty using a moving review highlight; keep Read and flag export/admin as lacking current need. 15–23 s: retract the excess permission edges, move and dim their cards, and mark them REVOKED while the read edge stays connected. 23–30 s: move a green read-test token along the retained path and stop a red export-test token at the removed connection, showing Read succeeds and Export denied. The central conclusion is: An access review preserves necessary privileges and removes excess access based on current duties.

Render a silent English 1920×1080, 16:9 MP4 at 30 fps. Use a left text column and a distinct right SVG diagram (1000×700 at x840,y165), with generous separation between headings, explanatory lines and the bottom takeaway. Use the literal palette: background #070b12, panels #0d1626 and #142238, primary #60a5fa, accent #fbbf24, successful results #34d399, denial/revocation #f87171, strong text #f8fafc and secondary text #94a3b8. Use Helvetica Neue, Helvetica, Arial, Segoe UI, sans-serif; animate whole labels and causal objects rather than individual letters. Keep node labels legible and unobscured. The supplied course kit is the source basis, using Remotion 4.0.410, React 19, TypeScript 5.8 and FFmpeg. Node.js, Chromium and installed system fonts are external dependencies; clean-environment exact reproduction has not been verified.
````

</details>

**Production:** Remotion; dependencies: remotion 4.0.410, React 19, TypeScript 5.8, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/source-kits/cybersecurity-and-identity-authentication.zip)

- [Concept reference](https://csrc.nist.gov/glossary/term/least_privilege) — Terminology and mechanism grounding
- [Concept reference](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/800-171r3/NIST.SP.800-171r3.html) — Terminology and mechanism grounding

[Back to course top](#cybersecurity-and-identity-authentication)

---
