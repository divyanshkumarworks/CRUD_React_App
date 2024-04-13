import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import supabase from 'src/config/supabaseClient';

import Iconify from 'src/components/iconify';

import ProjectCard from '../project-card';

// ----------------------------------------------------------------------

export default function ProjectsView() {
  const [fetchError, setFetchError] = useState(null);
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
        const { data, error } = await supabase
        .from('Projects')
        .select()

        if (error) {
            setFetchError('could not fetch the projects')
            setProjects(null)
            console.log(error)
        }

        if (data) {
            setProjects(data)
            setFetchError(null)
        }
    }

    fetchProjects()
  }, [])


  console.log(projects)

  return (
    <Container>
        <Typography variant="h4">Projects</Typography>

        <Grid container spacing={3}>
        {projects !== null ? (
            projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
            ))
        ) : null}
        </Grid>
    </Container>
  );
}
