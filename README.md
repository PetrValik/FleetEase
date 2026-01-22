# FleetEase

FleetEase is a lightweight vehicle management application designed for both individuals and organizations.  
It helps users track vehicle maintenance, report defects, manage reservations, and monitor important deadlines.

---

## Project context

FleetEase was created as a **school team project**, originally planned for **6 members** and later completed by **4 team members**.

- I acted as the **technical lead**, coordinating development and resolving integration issues
- I am the **author of the complete backend (Node.js + Express)**, the **core frontend architecture**, and a large portion of application functionality
- I designed the **database entities**, created the **Supabase database**, and populated it with initial reference data (e.g. countries)
- I assisted other team members with:
  - Git workflows (branches, merges, conflict resolution)
  - bug fixing
  - completing unfinished or blocked features close to the deadline
- The backend is implemented using **Node.js and Express**
- **Supabase is used as the database**
- **AI tools were used during development by me and other team members**
- The application was deployed to **Google Cloud Platform (GCP)**
- The application supports authentication using **email/password or Google sign-in**
- For simplicity and faster development, backend endpoints typically return **complete domain objects** rather than narrowly scoped or filtered data
- Most API operations follow standard CRUD patterns (`get`, `getAll`, `create`, `update`, `delete`)

---

## Team roles and contributions

- **PetrValik** – Tech Lead  
  Author of the complete backend (Express), core frontend architecture, major application features, bug fixes, merge conflict resolution, deployment, and authentication integration.

- **vanessopicasso** – Frontend Developer  
  Author of the vehicle dashboard, vehicle creation, reservations, and related frontend features.

- **Elohir1** – Project Manager  
  Responsible for project coordination and documentation planning. Implemented the Insurance page and additional features.

- **ShutenDoji9** – Team Member (partial involvement)  
  Implemented the admin dashboard as part of a separate assignment.

---

## Internal guides (created for team collaboration)

> These guides were created to support team collaboration during development.

### Git & workflow
- Git installation & repository setup  
  https://app.tango.us/app/workflow/Git-6367a7e1fdfe4d1eb2172a2ba50e561f

- Creating a new branch  
  https://app.tango.us/app/workflow/Git-branches-dd9b1a4656d549b5842af8da01970452

- Creating commits  
  https://app.tango.us/app/workflow/Git-commits-bc05ce81768a4bec901643f2dc2f68b9

- Merging changes from another branch  
  https://app.tango.us/app/workflow/Merge-from-another-Branch-23cc79ec99504c528ce99a23ea698107

- Pull requests & branch merging  
  https://app.tango.us/app/workflow/Git-pull-requests-c0af8de973734db48b4c6c264822b453

### Best practices
- Backend & Frontend best practices  
  https://app.tango.us/app/workflow/Best-Practice-55277d5977ae42e8aa152c08909109b8
