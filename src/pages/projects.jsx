import { Helmet } from 'react-helmet-async';

import { ProjectsView } from 'src/sections/projects/view';

// ----------------------------------------------------------------------

export default function ProjectsPage() {
  return (
    <>
      <Helmet>
        <title> Blog | Minimal UI </title>
      </Helmet>

      <ProjectsView />
    </>
  );
}