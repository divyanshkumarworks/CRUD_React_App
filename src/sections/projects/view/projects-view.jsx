import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import Popover from '@mui/material/Popover';
import LoadingButton from '@mui/lab/LoadingButton';

import supabase from 'src/config/supabaseClient';
import Iconify from 'src/components/iconify';

import ProjectCard from '../project-card';

// ----------------------------------------------------------------------

export default function ProjectsView() {
  const [fetchError, setFetchError] = useState(null);
  const [projects, setProjects] = useState(null);
  const [open, setOpen] = useState(null);


  const [formData, setFormData] = useState({
    title: ''
  });
 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData) {
      alert("please enter the title..")
    }
    else{
      const title = formData.title
      const {data, error} = await supabase
        .from('Projects')
        .insert([{title}])
        .select()

      if(error) {
        alert(error)
      }
      if(data) {
        setFormData(null)
        handleClose();
        fetchProjects();

      }
    }
  }

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {

    fetchProjects()
  }, [])

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
 
  return (
    <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" m={5}>
          <Typography variant="h4">Projects</Typography>


          <Button variant="contained" onClick={handleOpen} color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Project
          </Button>
        </Stack>

        <Popover
          open={!!open}
          anchorEl={open}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 300, left: 700 }}
          anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
          transformOrigin={{ vertical: 'center', horizontal: 'center' }}
          PaperProps={{
            sx: {
              p: 2,
              mt: 1,
              ml: 0.75,
              width: 500,
            },
          }}
        >
          <form onSubmit={handleSubmit}>
            <Container fixed>
              <Stack spacing={3} mb={2}>

              
                <TextField name="title" label="Enter project title" onChange={handleChange}/>

              </Stack>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                // onClick={handleClick}
              >
                create project
              </LoadingButton>
            </Container>
          </form>
          
        </Popover>

        <Grid container spacing={3}>
        {projects !== null ? (
            projects.map(project => (
                <ProjectCard key={project.id} project={project} openCreateProject={setOpen} fetchProjects={fetchProjects}/>
            ))
        ) : null}
        </Grid>
    </Container>

  );
}
