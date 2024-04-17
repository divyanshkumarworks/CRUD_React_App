import React, { useEffect, useState } from 'react'

import TextField from '@mui/material/TextField';

import Popover from '@mui/material/Popover';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Autocomplete from '@mui/material/Autocomplete';
import supabase from 'src/config/supabaseClient';


export default function NewUserPopover ({
    fetchEmployees, 
    handleClose, 
    open
}) {
    const [formData, setFormData] = useState({
        name:'',
        title:''    
    });
    const [fetchError, setFetchError] = useState(null);
    const [projects, setProjects] = useState(null);

    const [selectedProject, setSelectedProject] = useState({id:'', title:''})
    
    const handleSelectedProject = (e, selectedValue) => {
        setSelectedProject(selectedValue)
    } 

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        fetchProjects()
      }, [projects])
    
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formData.name === '') {
          alert('please enter employee name..')
        }
        else if (!selectedProject) {
          alert('select a project..')

        }
        else {
          const {data, error} = await supabase
          .from('Employees')
          .insert({name: formData.name, project_id: (selectedProject)? selectedProject.id: null})
          .select()
      
          if(error) {
          alert(error)
          }
          if(data) {
            setSelectedProject(null)  
            setFormData(null)
            handleClose();
            fetchEmployees();
          }
        }
    }

  return (
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

            <TextField name="name" label="Enter Employee Name" onChange={handleChange}/>
            
            <Autocomplete
            options={(projects || []).map((value) => ({ id: value.id, title: value.title }))}
            getOptionLabel={(option)=>option.title}
            isOptionEqualToValue={(option, value)=> option.value === value.value}
            value={selectedProject}
            onChange={handleSelectedProject}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Select Project from Employee" />}
            />

            </Stack>
            <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            >
            create employee
            </LoadingButton>
        </Container>
        </form>
        
    </Popover>
  )
}
