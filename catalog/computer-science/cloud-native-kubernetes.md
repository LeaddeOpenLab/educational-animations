# Cloud Native and Kubernetes

[← Computer Science](../../README.md#computer-science) · [Complete index](../INDEX.md)

15 videos · 0 awaiting production

Course bibliography supplied by the source list: Kubernetes, Docker, and Helm official documentation. Specific supporting references are listed per concept; missing references are not inferred.

[Download course ZIP](https://github.com/LeaddeOpenLab/educational-animations/releases/download/course-videos-computer-science-cloud-native-kubernetes/cloud-native-kubernetes-videos.zip) · 15 videos · bundle-2 · updated 2026-09-30T08:21:31Z
Package status: current. Package membership is recorded in its index.

[Explore Leadde animation tools](https://leadde.ai/animation). Copy an aligned prompt, open a suitable tool, then adapt it manually; exact reproduction is not promised.

---

<a id="recvw25sp7bjsk"></a>
<a id="container-image-layers-and-build-cache-reuse-layers"></a>
## Container Image Layers and Build Cache

`recvw25sP7BJsk` · Video available · review: **unreviewed** · version `v1`

**Learn:** Pending verification.
**Takeaway:** Pending verification.

https://github.com/user-attachments/assets/731de2f5-4ba1-446d-9aea-2eda1268e8a4

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cloud-native-kubernetes/container-image-layers-and-build-cache.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** unverified. Historical prompt; tool, timing and visual alignment require verification. Source/template/assets are not yet packaged.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about Container Image Layers and Build Cache for a Cloud Native and Kubernetes course. A source-only edit invalidates its COPY layer and descendants while dependencies remain cached. Use this concrete example: Dockerfile: base → dependencies → source → compile; the source changes. The central visual mechanism is: Four numbered filesystem slabs assemble in build order beside the Dockerfile instructions. A cache scan marks the unchanged stack. A source edit invalidates source and compile layers; those two slabs lift away, then return sequentially as source and compile rebuild. Base and dependency layers stay fixed and cached. Maintain these teaching beats: 0.0–7.0s: Build from ordered layers. Start with a base image. Install dependencies before copying source. 7.0–13.8s: Reuse the unchanged prefix. The same inputs produce cache hits. Later steps depend on earlier layers. 13.8–21.8s: Change only application code. The source COPY step becomes a miss. Dependency installation stays cached. 21.8–30.0s: Rebuild from the first miss. Rebuild the changed layer and later steps. Stable dependencies avoid repeated work. Preserve this correctness constraint: Avoid claiming every instruction always adds filesystem data; illustrate four filesystem-producing build steps.

Render at 1920×1080, 30 fps, exactly 900 frames, with no audio. Use a full-width 1760×740 mechanism stage, a compact heading above and one concise explanatory caption below. Use Helvetica Neue, Helvetica, Arial, or a similar sans-serif. Background is a dark gradient of #070b12, #0d1626 and #142238 with a subtle grid; use #60a5fa for normal objects and data flow, #fbbf24 for candidates or changed inputs, #34d399 for accepted or ready states, #f87171 for failures, #f8fafc for primary text and #94a3b8 for secondary text. Preserve object identity across teaching beats. Use smooth cubic easing for meaningful transitions lasting roughly 1–4 seconds, continuous packet movement on active paths, and clear holds around each causal result. Do not replace mechanism changes with title swaps or repeated card fades. Keep all labels separated from moving objects and maintain safe margins. The last frame must show the final mechanism outcome clearly.
````

</details>

**Production:** Tool not yet verified; dependencies: pending. Exact reproduction: not verified.

[Reproduction requirements and missing materials](../../docs/REUSE.md)

References: pending verification.

[Back to course top](#cloud-native-and-kubernetes)

---

<a id="recvw25sp7ks8s"></a>
<a id="pod-scheduling-onto-a-node-filter-and-bind"></a>
## Pod Scheduling onto a Node

`recvw25sP7ks8S` · Video available · review: **unreviewed** · version `v1`

**Learn:** Pending verification.
**Takeaway:** Pending verification.

https://github.com/user-attachments/assets/f372de8b-7b38-4193-b52d-0418a4c7944c

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cloud-native-kubernetes/pod-scheduling-onto-a-node.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** unverified. Historical prompt; tool, timing and visual alignment require verification. Source/template/assets are not yet packaged.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about Pod Scheduling onto a Node for a Cloud Native and Kubernetes course. The scheduler filters nodes using resource requests and constraints, scores feasible nodes, then binds a pending Pod. Use this concrete example: Pod requests 2 CPUs; nodes have 1, 4 and 3 CPUs available; illustrative scores 80 and 55. The central visual mechanism is: A two-CPU Pod footprint sits above three node racks exposing occupied and vacant CPU slots. Node A cannot fit it and is crossed out; B and C show illustrative scores. The footprint travels into node B, occupies two slots, and reduces free requested capacity from four CPUs to two. A kubelet image-pull path appears and the container engine starts. Maintain these teaching beats: 0.0–5.3s: Start with a pending Pod. It requests CPU and memory. A node has not been assigned yet. 5.3–11.3s: Remove infeasible nodes. Check available requested capacity. Required labels must also match. 11.3–17.2s: Rank feasible candidates. Score only the remaining nodes. Higher score wins in this example. 17.2–23.8s: Bind the Pod to a node. Record the selected node in the API. The scheduler does not run containers. 23.8–30.0s: Let the kubelet start it. The selected node pulls the image. Its runtime starts the containers. Preserve this correctness constraint: Show capacity as requests rather than live usage. Scores are illustrative, not defaults.

Render at 1920×1080, 30 fps, exactly 900 frames, with no audio. Use a full-width 1760×740 mechanism stage, a compact heading above and one concise explanatory caption below. Use Helvetica Neue, Helvetica, Arial, or a similar sans-serif. Background is a dark gradient of #070b12, #0d1626 and #142238 with a subtle grid; use #60a5fa for normal objects and data flow, #fbbf24 for candidates or changed inputs, #34d399 for accepted or ready states, #f87171 for failures, #f8fafc for primary text and #94a3b8 for secondary text. Preserve object identity across teaching beats. Use smooth cubic easing for meaningful transitions lasting roughly 1–4 seconds, continuous packet movement on active paths, and clear holds around each causal result. Do not replace mechanism changes with title swaps or repeated card fades. Keep all labels separated from moving objects and maintain safe margins. The last frame must show the final mechanism outcome clearly.
````

</details>

**Production:** Tool not yet verified; dependencies: pending. Exact reproduction: not verified.

[Reproduction requirements and missing materials](../../docs/REUSE.md)

References: pending verification.

[Back to course top](#cloud-native-and-kubernetes)

---

<a id="recvw25sp7nfvs"></a>
<a id="deployment-replica-reconciliation-restore-replicas"></a>
## Deployment Replica Reconciliation

`recvw25sP7NFVs` · Video available · review: **unreviewed** · version `v1`

**Learn:** Pending verification.
**Takeaway:** Pending verification.

https://github.com/user-attachments/assets/08b038df-6cfd-4f2d-be14-90da97452c5b

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cloud-native-kubernetes/deployment-replica-reconciliation.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** unverified. Historical prompt; tool, timing and visual alignment require verification. Source/template/assets are not yet packaged.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about Deployment Replica Reconciliation for a Cloud Native and Kubernetes course. A Deployment manages ReplicaSets, whose controller replaces missing Pods to converge on the declared count. Use this concrete example: desired 3; actual 3 → 2 → 3. The central visual mechanism is: A circular observation loop surrounds desired and observed replica counts. Pod B departs, leaving a dashed vacancy and an observed count of two. The shortfall signal reaches Deployment and ReplicaSet labels; a newly identified Pod D enters the vacancy. Observed count returns to three, shortfall becomes zero, and D becomes ready. Maintain these teaching beats: 0.0–6.7s: Declare the desired count. Deployment: three replicas. Its ReplicaSet manages the Pods. 6.7–14.2s: Observe a missing Pod. One Pod disappears. The desired count remains three. 14.2–22.3s: Create a replacement. The ReplicaSet sees a shortfall. A new Pod gets a new identity. 22.3–30.0s: Converge on the declaration. The replacement becomes ready. Controllers keep checking the state. Preserve this correctness constraint: Replacement is a new identity, not resurrection of deleted Pod.

Render at 1920×1080, 30 fps, exactly 900 frames, with no audio. Use a full-width 1760×740 mechanism stage, a compact heading above and one concise explanatory caption below. Use Helvetica Neue, Helvetica, Arial, or a similar sans-serif. Background is a dark gradient of #070b12, #0d1626 and #142238 with a subtle grid; use #60a5fa for normal objects and data flow, #fbbf24 for candidates or changed inputs, #34d399 for accepted or ready states, #f87171 for failures, #f8fafc for primary text and #94a3b8 for secondary text. Preserve object identity across teaching beats. Use smooth cubic easing for meaningful transitions lasting roughly 1–4 seconds, continuous packet movement on active paths, and clear holds around each causal result. Do not replace mechanism changes with title swaps or repeated card fades. Keep all labels separated from moving objects and maintain safe margins. The last frame must show the final mechanism outcome clearly.
````

</details>

**Production:** Tool not yet verified; dependencies: pending. Exact reproduction: not verified.

[Reproduction requirements and missing materials](../../docs/REUSE.md)

References: pending verification.

[Back to course top](#cloud-native-and-kubernetes)

---

<a id="recvw25sp7yvvi"></a>
<a id="rolling-update-and-rollback-hand-off-traffic"></a>
## Rolling Update and Rollback

`recvw25sP7YvVI` · Video available · review: **unreviewed** · version `v1`

**Learn:** Pending verification.
**Takeaway:** Pending verification.

https://github.com/user-attachments/assets/eeaa0296-75d1-443b-977d-ba535103e100

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cloud-native-kubernetes/rolling-update-and-rollback.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** unverified. Historical prompt; tool, timing and visual alignment require verification. Source/template/assets are not yet packaged.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about Rolling Update and Rollback for a Cloud Native and Kubernetes course. A rolling update grows a new ReplicaSet while reducing the old one, and rollback restores an earlier Pod template. Use this concrete example: Desired 3; v1 → v2 → explicit rollback. The central visual mechanism is: An animated request stream fans out to three v1 workers. A v2 worker appears in a parallel lane and waits for readiness. Traffic transfers before the corresponding v1 worker retires; the sequence repeats. An unready v2 worker stalls progress. An explicit undo removes that failed worker, brings v1 replicas back in sequence, and hands traffic back before retiring v2 workers. Maintain these teaching beats: 0.0–4.5s: Begin with the old revision. Three ready Pods serve traffic. The new template uses image v2. 4.5–9.5s: Add a new-version Pod. Allow one extra Pod during rollout. Keep all three required replicas available. 9.5–14.5s: Wait for readiness. A new Pod must become available. Then an old Pod can be removed. 14.5–20.0s: Continue the controlled swap. New replicas grow as old ones shrink. The Service keeps selecting ready Pods. 20.0–24.8s: Pause on an unhealthy revision. An unready Pod stalls progress. Rollback is an explicit recovery action. 24.8–30.0s: Restore the prior template. Undo to the previous revision. This does not roll back database data. Preserve this correctness constraint: No automatic rollback claim; maxSurge 1/maxUnavailable 0.

Render at 1920×1080, 30 fps, exactly 900 frames, with no audio. Use a full-width 1760×740 mechanism stage, a compact heading above and one concise explanatory caption below. Use Helvetica Neue, Helvetica, Arial, or a similar sans-serif. Background is a dark gradient of #070b12, #0d1626 and #142238 with a subtle grid; use #60a5fa for normal objects and data flow, #fbbf24 for candidates or changed inputs, #34d399 for accepted or ready states, #f87171 for failures, #f8fafc for primary text and #94a3b8 for secondary text. Preserve object identity across teaching beats. Use smooth cubic easing for meaningful transitions lasting roughly 1–4 seconds, continuous packet movement on active paths, and clear holds around each causal result. Do not replace mechanism changes with title swaps or repeated card fades. Keep all labels separated from moving objects and maintain safe margins. The last frame must show the final mechanism outcome clearly.
````

</details>

**Production:** Tool not yet verified; dependencies: pending. Exact reproduction: not verified.

[Reproduction requirements and missing materials](../../docs/REUSE.md)

References: pending verification.

[Back to course top](#cloud-native-and-kubernetes)

---

<a id="recvw25sp7lnsn"></a>
<a id="service-discovery-with-clusterip-keep-a-stable-ip"></a>
## Service Discovery with ClusterIP

`recvw25sP7LNSN` · Video available · review: **unreviewed** · version `v1`

**Learn:** Pending verification.
**Takeaway:** Pending verification.

https://github.com/user-attachments/assets/75fbdeb4-9e0b-4959-8917-3ea95b5532db

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cloud-native-kubernetes/service-discovery-with-clusterip.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** unverified. Historical prompt; tool, timing and visual alignment require verification. Source/template/assets are not yet packaged.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about Service Discovery with ClusterIP for a Cloud Native and Kubernetes course. A Service name resolves to a stable ClusterIP while matching ready Pod endpoints can change. Use this concrete example: api → 10.96.0.8, Pods A/B then B/C. The central visual mechanism is: A client name resolves through cluster DNS into a Service ClusterIP. Client packets first reach the stable central address, then begin routing to the ready endpoints. Pod A and its old IP depart; Pod C and a new IP enter on another curved path. The central address remains fixed and Pod B continues serving. Maintain these teaching beats: 0.0–5.7s: Resolve the Service name. A client asks cluster DNS for api. DNS returns the Service ClusterIP. 5.7–11.0s: Use the stable virtual IP. Clients target one Service address. The Service itself is not a Pod. 11.0–17.3s: Choose a ready endpoint. The Service selects app=api Pods. Traffic reaches an available backend. 17.3–23.8s: Replace a backend Pod. The old endpoint is removed. The replacement has a different Pod IP. 23.8–30.0s: Keep the client address. Endpoint membership can change. The ClusterIP remains stable. Preserve this correctness constraint: No claim DNS enumerates Pods for ordinary ClusterIP; distinguish headless.

Render at 1920×1080, 30 fps, exactly 900 frames, with no audio. Use a full-width 1760×740 mechanism stage, a compact heading above and one concise explanatory caption below. Use Helvetica Neue, Helvetica, Arial, or a similar sans-serif. Background is a dark gradient of #070b12, #0d1626 and #142238 with a subtle grid; use #60a5fa for normal objects and data flow, #fbbf24 for candidates or changed inputs, #34d399 for accepted or ready states, #f87171 for failures, #f8fafc for primary text and #94a3b8 for secondary text. Preserve object identity across teaching beats. Use smooth cubic easing for meaningful transitions lasting roughly 1–4 seconds, continuous packet movement on active paths, and clear holds around each causal result. Do not replace mechanism changes with title swaps or repeated card fades. Keep all labels separated from moving objects and maintain safe margins. The last frame must show the final mechanism outcome clearly.
````

</details>

**Production:** Tool not yet verified; dependencies: pending. Exact reproduction: not verified.

[Reproduction requirements and missing materials](../../docs/REUSE.md)

References: pending verification.

[Back to course top](#cloud-native-and-kubernetes)

---

<a id="recvw25sp7uxdl"></a>
<a id="ingress-host-and-path-routing-match-host-and-path"></a>
## Ingress Host and Path Routing

`recvw25sP7UxDl` · Video available · review: **unreviewed** · version `v1`

**Learn:** Pending verification.
**Takeaway:** Pending verification.

https://github.com/user-attachments/assets/b11852bf-8f6b-49e2-8e2a-7f8f8ee375b6

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cloud-native-kubernetes/ingress-host-and-path-routing.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** unverified. Historical prompt; tool, timing and visual alignment require verification. Source/template/assets are not yet packaged.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about Ingress Host and Path Routing for a Cloud Native and Kubernetes course. An Ingress controller uses HTTP host and path rules to forward requests to the specified backend Services. Use this concrete example: example.test /shop/cart and /api/items; other.test no match. The central visual mechanism is: A large HTTP request is disassembled into host and path strips. The host strip travels through a matching aperture; the path strip moves across a branching track that physically directs packets to shop or API workers. A second request uses the alternate track; an unmatched host exits into the configured default lane. Maintain these teaching beats: 0.0–5.5s: Read the HTTP request. Host: example.test Path: /shop/cart 5.5–11.2s: Match the configured host. The controller checks the host rule. Ingress needs an installed controller. 11.2–17.3s: Route the matching path. Prefix /shop selects shop-svc. That Service routes to its Pods. 17.3–23.7s: Change the path. The same host requests /api/items. Prefix /api selects api-svc. 23.7–30.0s: Handle unmatched requests. Another host matches neither rule. Use the configured default behavior. Preserve this correctness constraint: Do not imply Ingress creates controller automatically; prefix matching example not exact.

Render at 1920×1080, 30 fps, exactly 900 frames, with no audio. Use a full-width 1760×740 mechanism stage, a compact heading above and one concise explanatory caption below. Use Helvetica Neue, Helvetica, Arial, or a similar sans-serif. Background is a dark gradient of #070b12, #0d1626 and #142238 with a subtle grid; use #60a5fa for normal objects and data flow, #fbbf24 for candidates or changed inputs, #34d399 for accepted or ready states, #f87171 for failures, #f8fafc for primary text and #94a3b8 for secondary text. Preserve object identity across teaching beats. Use smooth cubic easing for meaningful transitions lasting roughly 1–4 seconds, continuous packet movement on active paths, and clear holds around each causal result. Do not replace mechanism changes with title swaps or repeated card fades. Keep all labels separated from moving objects and maintain safe margins. The last frame must show the final mechanism outcome clearly.
````

</details>

**Production:** Tool not yet verified; dependencies: pending. Exact reproduction: not verified.

[Reproduction requirements and missing materials](../../docs/REUSE.md)

References: pending verification.

[Back to course top](#cloud-native-and-kubernetes)

---

<a id="recvw25sp7njyg"></a>
<a id="configmap-injection-into-a-pod-compare-update-paths"></a>
## ConfigMap Injection into a Pod

`recvw25sP7nJYg` · Video available · review: **unreviewed** · version `v1`

**Learn:** Pending verification.
**Takeaway:** Pending verification.

https://github.com/user-attachments/assets/b674a7d7-306c-4db4-8903-9760ba27a8b1

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cloud-native-kubernetes/configmap-injection-into-a-pod.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** unverified. Historical prompt; tool, timing and visual alignment require verification. Source/template/assets are not yet packaged.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about ConfigMap Injection into a Pod for a Cloud Native and Kubernetes course. A ConfigMap can supply environment variables at container startup or projected files that update eventually. Use this concrete example: COLOR blue → green. The central visual mechanism is: A single COLOR chip splits into a process-memory snapshot and a mounted-file projection, shown as two large cutaway environments. A blue-to-green edit travels as an event. The file updates after a visible delay, then the application rereads it; the process-memory chip stays blue until a new process replaces the old one. Maintain these teaching beats: 0.0–5.3s: Store non-secret settings. ConfigMap key: COLOR=blue. Keep configuration outside the image. 5.3–11.7s: Choose how to inject it. Environment: a startup snapshot. Volume: a projected configuration file. 11.7–17.7s: Update the ConfigMap. Change COLOR from blue to green. The running process still has its old env. 17.7–23.8s: Let the volume refresh. Projected files update eventually. The application must reread the file. 23.8–30.0s: Start a fresh process. A new container receives green in env. A subPath mount does not auto-update. Preserve this correctness constraint: Environment never hot updates; file eventual update; subPath exception.

Render at 1920×1080, 30 fps, exactly 900 frames, with no audio. Use a full-width 1760×740 mechanism stage, a compact heading above and one concise explanatory caption below. Use Helvetica Neue, Helvetica, Arial, or a similar sans-serif. Background is a dark gradient of #070b12, #0d1626 and #142238 with a subtle grid; use #60a5fa for normal objects and data flow, #fbbf24 for candidates or changed inputs, #34d399 for accepted or ready states, #f87171 for failures, #f8fafc for primary text and #94a3b8 for secondary text. Preserve object identity across teaching beats. Use smooth cubic easing for meaningful transitions lasting roughly 1–4 seconds, continuous packet movement on active paths, and clear holds around each causal result. Do not replace mechanism changes with title swaps or repeated card fades. Keep all labels separated from moving objects and maintain safe margins. The last frame must show the final mechanism outcome clearly.
````

</details>

**Production:** Tool not yet verified; dependencies: pending. Exact reproduction: not verified.

[Reproduction requirements and missing materials](../../docs/REUSE.md)

References: pending verification.

[Back to course top](#cloud-native-and-kubernetes)

---

<a id="recvw25sp7lwkj"></a>
<a id="secret-mounting-and-environment-variables-rotate-keys"></a>
## Secret Mounting and Environment Variables

`recvw25sP7lWkJ` · Video available · review: **unreviewed** · version `v1`

**Learn:** Pending verification.
**Takeaway:** Pending verification.

https://github.com/user-attachments/assets/110c151a-c3c0-4285-9956-830983131a12

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cloud-native-kubernetes/secret-mounting-and-environment-variables.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** unverified. Historical prompt; tool, timing and visual alignment require verification. Source/template/assets are not yet packaged.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about Secret Mounting and Environment Variables for a Cloud Native and Kubernetes course. Secret keys can enter a container as mounted files or environment variables, with different update behavior. Use this concrete example: Masked key version A → B, volume and env. The central visual mechanism is: A masked API Secret sits in a central vault with a rotation ring. Two curved distribution paths lead to a projected credential file on the left and startup process memory on the right. Version B moves to the file after a sync delay; the right-hand snapshot changes only when the process is replaced. Base64 is explicitly distinguished from encryption. Maintain these teaching beats: 0.0–5.5s: Reference a Secret key. Use a Secret for credential material. Only display a masked example value. 5.5–11.7s: Mount the key as a file. The application reads /run/key. Grant access only where it is needed. 11.7–17.5s: Or inject it into the environment. The value is set when the container starts. The process environment is a snapshot. 17.5–24.0s: Rotate and reload deliberately. Mounted values update eventually. Restart to refresh an environment value. 24.0–30.0s: Start with the rotated credential. A new process receives the new snapshot. Base64 is encoding, not encryption. Preserve this correctness constraint: No actual credentials; no false encryption claim; normal volume, not subPath.

Render at 1920×1080, 30 fps, exactly 900 frames, with no audio. Use a full-width 1760×740 mechanism stage, a compact heading above and one concise explanatory caption below. Use Helvetica Neue, Helvetica, Arial, or a similar sans-serif. Background is a dark gradient of #070b12, #0d1626 and #142238 with a subtle grid; use #60a5fa for normal objects and data flow, #fbbf24 for candidates or changed inputs, #34d399 for accepted or ready states, #f87171 for failures, #f8fafc for primary text and #94a3b8 for secondary text. Preserve object identity across teaching beats. Use smooth cubic easing for meaningful transitions lasting roughly 1–4 seconds, continuous packet movement on active paths, and clear holds around each causal result. Do not replace mechanism changes with title swaps or repeated card fades. Keep all labels separated from moving objects and maintain safe margins. The last frame must show the final mechanism outcome clearly.
````

</details>

**Production:** Tool not yet verified; dependencies: pending. Exact reproduction: not verified.

[Reproduction requirements and missing materials](../../docs/REUSE.md)

References: pending verification.

[Back to course top](#cloud-native-and-kubernetes)

---

<a id="recvw25sp7jbum"></a>
<a id="liveness-and-readiness-probes-route-or-restart"></a>
## Liveness and Readiness Probes

`recvw25sP7JbUm` · Video available · review: **unreviewed** · version `v1`

**Learn:** Pending verification.
**Takeaway:** Pending verification.

https://github.com/user-attachments/assets/74a74e3c-21d5-4d80-ba5d-c14819df823d

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cloud-native-kubernetes/liveness-and-readiness-probes.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** unverified. Historical prompt; tool, timing and visual alignment require verification. Source/template/assets are not yet packaged.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about Liveness and Readiness Probes for a Cloud Native and Kubernetes course. Readiness failure removes a Pod from Service traffic, while repeated liveness failure triggers container restart. Use this concrete example: failureThreshold=3; readiness fail then liveness 1→2→3. The central visual mechanism is: An active container engine receives a request stream and emits two independent probe traces. A readiness pulse closes the request valve while the engine continues spinning. Three failed liveness pulses fill a counter; only then the engine stops and restarts inside the same Pod shell. Successful readiness opens the valve again. Maintain these teaching beats: 0.0–4.5s: Ask two different questions. Ready: can this Pod serve requests? Live: should this container keep running? 4.5–9.5s: Readiness can fail first. The process is still running. Readiness failure alone does not restart it. 9.5–14.5s: Stop sending new traffic. The Service stops using this endpoint. Other ready Pods can still serve. 14.5–20.2s: Count liveness failures. Wait for the configured failure threshold. A single failure need not restart it. 20.2–25.2s: Restart the unhealthy container. The kubelet performs the restart. The Pod need not be replaced. 25.2–30.0s: Return when ready. The process recovers and passes readiness. Traffic can return to the endpoint. Preserve this correctness constraint: Restart container not entire Pod; failureThreshold explicit.

Render at 1920×1080, 30 fps, exactly 900 frames, with no audio. Use a full-width 1760×740 mechanism stage, a compact heading above and one concise explanatory caption below. Use Helvetica Neue, Helvetica, Arial, or a similar sans-serif. Background is a dark gradient of #070b12, #0d1626 and #142238 with a subtle grid; use #60a5fa for normal objects and data flow, #fbbf24 for candidates or changed inputs, #34d399 for accepted or ready states, #f87171 for failures, #f8fafc for primary text and #94a3b8 for secondary text. Preserve object identity across teaching beats. Use smooth cubic easing for meaningful transitions lasting roughly 1–4 seconds, continuous packet movement on active paths, and clear holds around each causal result. Do not replace mechanism changes with title swaps or repeated card fades. Keep all labels separated from moving objects and maintain safe margins. The last frame must show the final mechanism outcome clearly.
````

</details>

**Production:** Tool not yet verified; dependencies: pending. Exact reproduction: not verified.

[Reproduction requirements and missing materials](../../docs/REUSE.md)

References: pending verification.

[Back to course top](#cloud-native-and-kubernetes)

---

<a id="recvw25sp7irey"></a>
<a id="horizontal-pod-autoscaler-feedback-loop-scale-to-target"></a>
## Horizontal Pod Autoscaler Feedback Loop

`recvw25sP7iREY` · Video available · review: **unreviewed** · version `v1`

**Learn:** Pending verification.
**Takeaway:** Pending verification.

https://github.com/user-attachments/assets/5a9ab5ee-2744-4795-bf88-0a5423b28c67

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cloud-native-kubernetes/horizontal-pod-autoscaler-feedback-loop.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** unverified. Historical prompt; tool, timing and visual alignment require verification. Source/template/assets are not yet packaged.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about Horizontal Pod Autoscaler Feedback Loop for a Cloud Native and Kubernetes course. The HPA compares measured resource utilization with a target and adjusts the desired replica count. Use this concrete example: 3 replicas, 80% measured, 40% target → ceil(6). The central visual mechanism is: A growing CPU trace shows 80 percent utilization above a fixed 40 percent target. A formula links the measured ratio to six replicas from three. Three new workers appear beneath a fixed-load stream, and the CPU curve settles near the target. A stabilization region highlights why a brief dip does not immediately remove replicas. Maintain these teaching beats: 0.0–5.5s: Measure average CPU utilization. Utilization is relative to CPU requests. A metrics source supplies observations. 5.5–11.8s: Compare with the target. Observed 80%; target 40%. Estimate replicas using their ratio. 11.8–17.8s: Update desired replicas. Three × 80 / 40 gives six. The workload controller creates more Pods. 17.8–24.2s: Measure the new utilization. More replicas share the same load. This example settles near the target. 24.2–30.0s: Avoid reacting to every blip. Tolerance and scaling policies matter. Stabilization can delay downscaling. Preserve this correctness constraint: Basic formula illustrative; requests/metrics required; no guarantee linear real systems.

Render at 1920×1080, 30 fps, exactly 900 frames, with no audio. Use a full-width 1760×740 mechanism stage, a compact heading above and one concise explanatory caption below. Use Helvetica Neue, Helvetica, Arial, or a similar sans-serif. Background is a dark gradient of #070b12, #0d1626 and #142238 with a subtle grid; use #60a5fa for normal objects and data flow, #fbbf24 for candidates or changed inputs, #34d399 for accepted or ready states, #f87171 for failures, #f8fafc for primary text and #94a3b8 for secondary text. Preserve object identity across teaching beats. Use smooth cubic easing for meaningful transitions lasting roughly 1–4 seconds, continuous packet movement on active paths, and clear holds around each causal result. Do not replace mechanism changes with title swaps or repeated card fades. Keep all labels separated from moving objects and maintain safe margins. The last frame must show the final mechanism outcome clearly.
````

</details>

**Production:** Tool not yet verified; dependencies: pending. Exact reproduction: not verified.

[Reproduction requirements and missing materials](../../docs/REUSE.md)

References: pending verification.

[Back to course top](#cloud-native-and-kubernetes)

---

<a id="recvw25sp75qpu"></a>
<a id="persistentvolume-claim-binding-keep-stored-data"></a>
## PersistentVolume Claim Binding

`recvw25sP75Qpu` · Video available · review: **unreviewed** · version `v1`

**Learn:** Pending verification.
**Takeaway:** Pending verification.

https://github.com/user-attachments/assets/52428da1-3829-496c-bde0-3595180149a1

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cloud-native-kubernetes/persistentvolume-claim-binding.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** unverified. Historical prompt; tool, timing and visual alignment require verification. Source/template/assets are not yet packaged.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about PersistentVolume Claim Binding for a Cloud Native and Kubernetes course. A PersistentVolumeClaim requests compatible storage and binds to a matching PersistentVolume before use. Use this concrete example: PVC 8 Gi/RWO/fast → PV 10 Gi/RWO/fast. The central visual mechanism is: An 8 Gi claim appears as a connector with capacity, class, and access-mode pins. Three storage drums expose incompatible or matching sockets. Two connectors fail their respective tests; the compatible volume locks to the claim. A Pod writes distinct data blocks, is removed, and a replacement Pod reads those same blocks through the preserved claim. Maintain these teaching beats: 0.0–5.5s: Declare the storage request. A PVC asks for capacity and access mode. Its storage class must be compatible. 5.5–11.5s: Find a compatible volume. A small volume cannot satisfy the claim. A different class is not a match. 11.5–17.5s: Bind claim and volume. This example uses a precreated PV. The binding is exclusive to this claim. 17.5–23.7s: Mount the claim in a Pod. The Pod references the PVC by name. The storage is separate from its container. 23.7–30.0s: Replace the Pod, keep the data. The replacement mounts the same claim. PVC deletion follows the reclaim policy. Preserve this correctness constraint: State precreated static PV, no universal immediate binding; reclaim caveat.

Render at 1920×1080, 30 fps, exactly 900 frames, with no audio. Use a full-width 1760×740 mechanism stage, a compact heading above and one concise explanatory caption below. Use Helvetica Neue, Helvetica, Arial, or a similar sans-serif. Background is a dark gradient of #070b12, #0d1626 and #142238 with a subtle grid; use #60a5fa for normal objects and data flow, #fbbf24 for candidates or changed inputs, #34d399 for accepted or ready states, #f87171 for failures, #f8fafc for primary text and #94a3b8 for secondary text. Preserve object identity across teaching beats. Use smooth cubic easing for meaningful transitions lasting roughly 1–4 seconds, continuous packet movement on active paths, and clear holds around each causal result. Do not replace mechanism changes with title swaps or repeated card fades. Keep all labels separated from moving objects and maintain safe margins. The last frame must show the final mechanism outcome clearly.
````

</details>

**Production:** Tool not yet verified; dependencies: pending. Exact reproduction: not verified.

[Reproduction requirements and missing materials](../../docs/REUSE.md)

References: pending verification.

[Back to course top](#cloud-native-and-kubernetes)

---

<a id="recvw25sp7wz05"></a>
<a id="namespace-resource-quotas-enforce-a-budget"></a>
## Namespace Resource Quotas

`recvw25sP7wZ05` · Video available · review: **unreviewed** · version `v1`

**Learn:** Pending verification.
**Takeaway:** Pending verification.

https://github.com/user-attachments/assets/e989cc78-f630-4155-a928-7bc61e67963d

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cloud-native-kubernetes/namespace-resource-quotas.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** unverified. Historical prompt; tool, timing and visual alignment require verification. Source/template/assets are not yet packaged.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about Namespace Resource Quotas for a Cloud Native and Kubernetes course. ResourceQuota limits aggregate namespace resource requests; admission rejects a request that would exceed the budget. Use this concrete example: hard requests.cpu=4, used=3, proposed 2 rejected then 1 accepted. The central visual mechanism is: A namespace contains four equal one-CPU budget cells. Three cells fill with existing declared requests. A two-unit proposal expands from the remaining slot beyond the cap and is rejected. A one-unit proposal fills the last cell without moving the existing reservations. Maintain these teaching beats: 0.0–6.8s: Set a namespace-wide budget. Quota: four CPUs of requests. This is a shared namespace allowance. 6.8–14.2s: Account for existing requests. Existing Pods request three CPUs. Quota tracks declarations, not live CPU load. 14.2–22.3s: Reject an over-budget addition. A new two-CPU request would total five. Admission rejects the create request. 22.3–30.0s: Submit a request that fits. A one-CPU request brings the total to four. Admission can now accept it. Preserve this correctness constraint: Quota rejects admission, does not throttle each Pod; subject to other admission checks.

Render at 1920×1080, 30 fps, exactly 900 frames, with no audio. Use a full-width 1760×740 mechanism stage, a compact heading above and one concise explanatory caption below. Use Helvetica Neue, Helvetica, Arial, or a similar sans-serif. Background is a dark gradient of #070b12, #0d1626 and #142238 with a subtle grid; use #60a5fa for normal objects and data flow, #fbbf24 for candidates or changed inputs, #34d399 for accepted or ready states, #f87171 for failures, #f8fafc for primary text and #94a3b8 for secondary text. Preserve object identity across teaching beats. Use smooth cubic easing for meaningful transitions lasting roughly 1–4 seconds, continuous packet movement on active paths, and clear holds around each causal result. Do not replace mechanism changes with title swaps or repeated card fades. Keep all labels separated from moving objects and maintain safe margins. The last frame must show the final mechanism outcome clearly.
````

</details>

**Production:** Tool not yet verified; dependencies: pending. Exact reproduction: not verified.

[Reproduction requirements and missing materials](../../docs/REUSE.md)

References: pending verification.

[Back to course top](#cloud-native-and-kubernetes)

---

<a id="recvw25sp7ldyz"></a>
<a id="serviceaccount-and-rbac-authorization-check-access"></a>
## ServiceAccount and RBAC Authorization

`recvw25sP7lDYZ` · Video available · review: **unreviewed** · version `v1`

**Learn:** Pending verification.
**Takeaway:** Pending verification.

https://github.com/user-attachments/assets/e2bb81b8-7723-434c-accf-97548f7a6c53

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cloud-native-kubernetes/serviceaccount-and-rbac-authorization.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** unverified. Historical prompt; tool, timing and visual alignment require verification. Source/template/assets are not yet packaged.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about ServiceAccount and RBAC Authorization for a Cloud Native and Kubernetes course. A ServiceAccount identifies a workload; Role permissions and a RoleBinding determine whether its API action is authorized. Use this concrete example: reporter ServiceAccount; get pods allowed; delete secrets denied. The central visual mechanism is: A ServiceAccount identity icon connects through a RoleBinding to a Role with verb, resource and namespace fields. A get-pods request has matching permission markers and travels through an API authorization gate. A delete-secrets request has unmatched markers and stops at the boundary. Maintain these teaching beats: 0.0–5.3s: Identify the workload. A Pod uses ServiceAccount reporter. Authentication establishes that identity. 5.3–11.2s: Define a narrow permission. A Role permits get on pods. Its scope is namespace team-a. 11.2–17.3s: Connect the subject to the Role. RoleBinding names the ServiceAccount. Permissions are granted through this link. 17.3–23.7s: Authorize a matching action. get pods in team-a matches the rule. The API request may proceed. 23.7–30.0s: Deny an unmatched action. delete secrets is not granted. Authentication does not imply permission. Preserve this correctness constraint: RBAC allow rules additive; absence of permission denies, not explicit deny Role.

Render at 1920×1080, 30 fps, exactly 900 frames, with no audio. Use a full-width 1760×740 mechanism stage, a compact heading above and one concise explanatory caption below. Use Helvetica Neue, Helvetica, Arial, or a similar sans-serif. Background is a dark gradient of #070b12, #0d1626 and #142238 with a subtle grid; use #60a5fa for normal objects and data flow, #fbbf24 for candidates or changed inputs, #34d399 for accepted or ready states, #f87171 for failures, #f8fafc for primary text and #94a3b8 for secondary text. Preserve object identity across teaching beats. Use smooth cubic easing for meaningful transitions lasting roughly 1–4 seconds, continuous packet movement on active paths, and clear holds around each causal result. Do not replace mechanism changes with title swaps or repeated card fades. Keep all labels separated from moving objects and maintain safe margins. The last frame must show the final mechanism outcome clearly.
````

</details>

**Production:** Tool not yet verified; dependencies: pending. Exact reproduction: not verified.

[Reproduction requirements and missing materials](../../docs/REUSE.md)

References: pending verification.

[Back to course top](#cloud-native-and-kubernetes)

---

<a id="recvw25sp72ohb"></a>
<a id="networkpolicy-traffic-selection-match-peer-and-port"></a>
## NetworkPolicy Traffic Selection

`recvw25sP72oHb` · Video available · review: **unreviewed** · version `v1`

**Learn:** Pending verification.
**Takeaway:** Pending verification.

https://github.com/user-attachments/assets/91dc8384-896c-49cc-b23f-b7e62ffd7cc3

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cloud-native-kubernetes/networkpolicy-traffic-selection.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** unverified. Historical prompt; tool, timing and visual alignment require verification. Source/template/assets are not yet packaged.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about NetworkPolicy Traffic Selection for a Cloud Native and Kubernetes course. NetworkPolicy selects destination Pods and allowed peers/ports, with ingress and egress constraints evaluated together. Use this concrete example: frontend/db labels; TCP 5432; other and port80 blocked under only this policy. The central visual mechanism is: A database sits inside an ingress-selection membrane while frontend and worker Pods occupy separate source lanes. Traffic encounters peer-selector and destination-port gates. Frontend TCP 5432 passes both; worker traffic stops at the peer gate and frontend port 80 stops at the port gate. A final source boundary makes the independent egress requirement visible. Maintain these teaching beats: 0.0–5.5s: Select the protected Pods. podSelector chooses app=db. This policy isolates their ingress traffic. 5.5–11.3s: Allow a specific source group. Allow Pods labeled app=frontend. This example keeps peers in one namespace. 11.3–17.7s: Also match the destination port. Permit TCP traffic to port 5432. Both peer and port must match this rule. 17.7–24.0s: Test the non-matching cases. Other peers do not match this allow rule. Frontend traffic to port 80 also fails. 24.0–30.0s: Check both sides of the connection. Source egress must permit traffic too. Enforcement needs a supporting network plugin. Preserve this correctness constraint: Policies additive union; selected ingress example no other allow policies; no ordered firewall rules.

Render at 1920×1080, 30 fps, exactly 900 frames, with no audio. Use a full-width 1760×740 mechanism stage, a compact heading above and one concise explanatory caption below. Use Helvetica Neue, Helvetica, Arial, or a similar sans-serif. Background is a dark gradient of #070b12, #0d1626 and #142238 with a subtle grid; use #60a5fa for normal objects and data flow, #fbbf24 for candidates or changed inputs, #34d399 for accepted or ready states, #f87171 for failures, #f8fafc for primary text and #94a3b8 for secondary text. Preserve object identity across teaching beats. Use smooth cubic easing for meaningful transitions lasting roughly 1–4 seconds, continuous packet movement on active paths, and clear holds around each causal result. Do not replace mechanism changes with title swaps or repeated card fades. Keep all labels separated from moving objects and maintain safe margins. The last frame must show the final mechanism outcome clearly.
````

</details>

**Production:** Tool not yet verified; dependencies: pending. Exact reproduction: not verified.

[Reproduction requirements and missing materials](../../docs/REUSE.md)

References: pending verification.

[Back to course top](#cloud-native-and-kubernetes)

---

<a id="recvw25tezr38d"></a>
<a id="helm-values-and-template-rendering-render-then-install"></a>
## Helm Values and Template Rendering

`recvw25tEzR38D` · Video available · review: **unreviewed** · version `v1`

**Learn:** Pending verification.
**Takeaway:** Pending verification.

https://github.com/user-attachments/assets/00561097-fd13-4bb6-bdf5-ba2658b6b346

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/cloud-native-kubernetes/helm-values-and-template-rendering.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** unverified. Historical prompt; tool, timing and visual alignment require verification. Source/template/assets are not yet packaged.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about Helm Values and Template Rendering for a Cloud Native and Kubernetes course. Helm merges supplied values into chart templates to produce Kubernetes manifests; rendering alone does not create live resources. Use this concrete example: replicas 1 → 3; image v1 → v2. The central visual mechanism is: Default value chips are replaced by release-specific replicas and image-tag overrides. Animated input paths lead into a template excerpt. The two template expressions resolve line by line into literal YAML values. That manifest remains outside the cluster until an explicit install path appears and three v2 Pods are created. Maintain these teaching beats: 0.0–6.8s: Start with chart defaults. values.yaml provides baseline settings. Templates reference .Values entries. 6.8–14.2s: Apply release-specific overrides. Set replicas to three for this release. Choose image tag v2 in the override file. 14.2–22.3s: Render concrete Kubernetes YAML. Template expressions become literal values. helm template prints the manifests. 22.3–30.0s: Apply only when installing. helm install submits rendered resources. Printing YAML alone changes no cluster. Preserve this correctness constraint: No claim helm template applies; values precedence limited to default vs explicit file.

Render at 1920×1080, 30 fps, exactly 900 frames, with no audio. Use a full-width 1760×740 mechanism stage, a compact heading above and one concise explanatory caption below. Use Helvetica Neue, Helvetica, Arial, or a similar sans-serif. Background is a dark gradient of #070b12, #0d1626 and #142238 with a subtle grid; use #60a5fa for normal objects and data flow, #fbbf24 for candidates or changed inputs, #34d399 for accepted or ready states, #f87171 for failures, #f8fafc for primary text and #94a3b8 for secondary text. Preserve object identity across teaching beats. Use smooth cubic easing for meaningful transitions lasting roughly 1–4 seconds, continuous packet movement on active paths, and clear holds around each causal result. Do not replace mechanism changes with title swaps or repeated card fades. Keep all labels separated from moving objects and maintain safe margins. The last frame must show the final mechanism outcome clearly.
````

</details>

**Production:** Tool not yet verified; dependencies: pending. Exact reproduction: not verified.

[Reproduction requirements and missing materials](../../docs/REUSE.md)

References: pending verification.

[Back to course top](#cloud-native-and-kubernetes)

---
