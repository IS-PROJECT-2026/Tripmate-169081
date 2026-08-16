# Project Submission Report

## 1. Student Details

- **Full Name:** Njoroge Viviane Wangari
- **GitHub Username:** wangari005
- **Email:** viviane.njoroge@strathmore.edu

---

## 2. Deployed Project Link

- **Live GitHub Pages URL:** [Paste your live deployment link here]
  https://is-project-2026.github.io/Tripmate-169081/

---

## 3. Reflection — Grounded in Your Git History

> **Rules:** Every answer below **must include a direct link** to the specific commit, PR, issue, or branch in your repository that demonstrates what you are describing. Answers without working links will not be graded. Generic explanations that could apply to any project will receive zero marks.
>
> **Marks:** A (2 marks) · B (1 mark) · C (1 mark) · D (1 mark) = **5 marks total**

### A. Your Best Commit

- **Commit URL:** https://github.com/IS-PROJECT-2026/Tripmate-169081/commit/5c504cf
- **Why this one?** This commit follows the Conventional Commits format by using the `docs` type and a clear, concise subject. It also represents a meaningful documentation change by adding the project's README.

### B. A Mistake or Struggle

- **Link to the evidence:** https://github.com/IS-PROJECT-2026/Tripmate-169081/issues/21
- **What happened and how did you recover?** The Dashboard "Next Trip" section was not reflecting the saved trip even though trip creation and the trip summary were working correctly. I traced the problem to the dashboard update logic, corrected it, and tested the dashboard to confirm that the saved trip was displayed correctly.

### C. A Pull Request You're Proud Of

- **PR URL:** https://github.com/IS-PROJECT-2026/Tripmate-169081/pull/51
- **What did you check before merging?** I reviewed the changes and tested the affected application functionality to confirm that the fixes worked correctly without breaking the existing features. I also checked that the changes were on the correct feature branch and that the pull request could be merged cleanly.

### D. One Thing You Would Do Differently

- **What would you change?** If I were starting the project again, I would set `main` as the repository's default branch at the beginning of the project. This would make the branching and pull request workflow clearer from the start and avoid confusion later when configuring deployment and reviewing the repository.
- **Link to the evidence of the original decision:** [https://github.com/IS-PROJECT-2026/Tripmate-169081/settings/branches]

---

## 4. Screenshots of Key GitHub Features

Demonstrate your workflow mechanics by embedding your screenshots below.

> **CRITICAL FOR WORKING IMAGES:** Do not type manual folder paths. Edit this file directly on the GitHub web interface, click on the blank line below each prompt, and **paste (Ctrl+V / Cmd+V)** your screenshot. GitHub will automatically upload the file and generate a permanent, working image link for you.

### A. Milestones and Issues
*Provide a screenshot showing your active milestone(s) and the granular tracking issues linked directly to them.*

<img width="940" height="467" alt="image" src="https://github.com/user-attachments/assets/fa347189-9583-4874-9a30-40c9aa0bc092" />


 * **Caption:** The project milestones organize development into distinct phases, with individual issues assigned to each milestone to track the project's development tasks.

### B. Project Board
*Provide a screenshot of your GitHub Project Board with your issues organized dynamically across columns (To Do, In Progress, Done).*

<img width="1916" height="780" alt="image" src="https://github.com/user-attachments/assets/728afec3-41f0-432e-81c3-5896d18477c1" />


* **Caption:** The project board tracks development tasks across To Do, In Progress and Done showing the progression of issues throughout the project.

### C. Branching Architecture
*Provide a screenshot showing your local or remote Git branch list, highlighting your use of conventional, issue-linked naming patterns (e.g., `feat/`, `fix/`, `style/`).*

<img width="940" height="845" alt="image" src="https://github.com/user-attachments/assets/7ee13df2-def0-4016-bf5f-b33c2164947c" />


* **Caption:** The branch structure demonstrates issue-linked development branches using consistent naming conventions such as `feat/` while keeping development isolated from the `main` branch.

### D. Pull Requests & Traceability
*Provide a screenshot of a completed or open Pull Request (PR) on GitHub that clearly shows it is linked to a related development issue.*


<img width="940" height="435" alt="image" src="https://github.com/user-attachments/assets/33d759a8-d109-469b-bfeb-3d624d1ffb11" />

<img width="940" height="402" alt="image" src="https://github.com/user-attachments/assets/2c8c429a-523f-4a7a-98a0-5325a56c58f6" />


* **Caption:** Pull Request #51 demonstrates traceability between the application bug-fix work and Issue #21, showing how the feature branch changes were reviewed before being merged into the main branch.

---

## 5. Merge Conflict Evidence

You must engineer **three merge conflicts**, each triggered by a **different cause** from those covered in the lecture. For Conflict 1, document the full resolution lifecycle. For Conflicts 2 and 3, provide the conflict marker screenshot and identify the cause.

> **Marks:** Conflict 1 full chronology (2 marks) · Conflict 2 (1 mark) · Conflict 3 (1 mark) · All three use distinct causes (1 mark) = **5 marks total**

---

### Conflict 1 — Full Chronology

**What cause did you use?** Same-line content conflict — both branches modified the same line differently.

#### Step 1: Generating the Clash



<img width="940" height="425" alt="image" src="https://github.com/user-attachments/assets/59d76ade-0fda-411a-8614-0682bb36aa54" />



* **Caption:** The merge attempt produced a conflict because the two branches contained different changes to the same line of the navbar code.

#### Step 2: Inside the Code Editor (Conflict Markers)


<img width="940" height="472" alt="image" src="https://github.com/user-attachments/assets/a1ccd3f7-1456-4fc6-a457-358afff1fa44" />


* **Caption:** Git displayed conflict markers showing the competing versions from the two branches. I reviewed both changes and selected the correct version before removing the conflict markers.

#### Step 3: Resolution & Clean Merge


<img width="940" height="468" alt="image" src="https://github.com/user-attachments/assets/828c819f-7173-4518-86eb-5142984f0e62" />


* **Caption:** The conflicting navbar changes were resolved, the conflict markers were removed, and the corrected version was successfully committed and merged.

### Conflict 2 — Different Cause

**What cause did you use?** Modify/delete conflict

**Why does this cause trigger a conflict?** A modify/delete conflict occurs when one branch modifies a file while another branch deletes the same file. Git cannot automatically determine whether the file should be kept with the modification or deleted, so manual resolution is required.


<img width="940" height="143" alt="image" src="https://github.com/user-attachments/assets/0e189528-2864-482a-ae2c-231bcb11af8c" />


* **Caption:** The `conflict/3-modify` branch modified `conflict-test.txt`, while the `conflict/3-delete` branch deleted the same file, causing Git to report a modify/delete conflict during the merge.

### Conflict 3 — Different Cause

**What cause did you use?** Rename/rename conflict

**Why does this cause trigger a conflict?** A rename/rename conflict occurs when two branches rename the same original file to different filenames. Git cannot automatically determine which new filename should be used, so the conflict must be resolved manually.


<img width="940" height="109" alt="image" src="https://github.com/user-attachments/assets/f00f0c56-d17f-4e32-af9e-796630096bdd" />


* **Caption:** The `conflict/rename-a` branch renamed `rename-test.txt` to `rename-a.txt`, while the `conflict/rename-b` branch renamed the same file to `rename-b.txt`, producing a rename/rename conflict during the merge.

## 6. Feedback & Evaluation

To help improve this course for future engineering cohorts, please take 2 minutes to fill out the anonymous feedback form. Your honest review helps shape how this program is taught next semester!
- [Done ] **Anonymous Evaluation Form:** [Course & Instructor Evaluation](https://forms.gle/YLybnsyXXErKEg3s9)

---
 
## Final Submission
 
Once your repository is complete, submit your work through the official submission form below. The form will **stop accepting responses after Monday, August 17th, 2026** — no late submissions will be accepted.
 
> **Submission Form:** [https://forms.gle/KrT4VxtFtkU3wtYu8](https://forms.gle/KrT4VxtFtkU3wtYu8)
