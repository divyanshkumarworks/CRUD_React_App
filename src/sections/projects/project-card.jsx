
import {React, useState}from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';

import supabase from 'src/config/supabaseClient';
import Iconify from 'src/components/iconify';

export default function ProjectCard ({project, openCreateProject, fetchProjects}) {

  const [open, setOpen] = useState(null);

  const handleDelete = async (e) => {
    const {data, error} = await supabase
      .from('Projects')
      .delete()
      .eq('id', project.id)
      .select()

    if (error) {
      alert(error)
    }

    if (data) {
      console.log(data)
      handleCloseMenu();
      fetchProjects();
    }
  }

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget); 
  };

  const handleCloseMenu = () => {
    setOpen(null);
    // openCreateProject(e.currentTarget);

  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   const title = project.title
  //   const {data, error} = await supabase
  //     .from('Projects')
  //     .update([{title}])
  //     .eq('id', project)

  //   if(error) {
  //     alert(error)
  //   }
  //   if(data) {
  //     handleClose();
  //     fetchProjects();

  //   }
  // }

  const card = (
      <>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            {project.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </CardActions>

        <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
        

      {/* <Popover
          open={!!openUpdate}
          anchorEl={openUpdate}
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
                update project
              </LoadingButton>
            </Container>
          </form>
          
        </Popover> */}
      </>
    );

  return (
    <Grid>
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    </Grid>
  )
}
