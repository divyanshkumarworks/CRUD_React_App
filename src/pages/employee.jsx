import { Helmet } from 'react-helmet-async';
import { EmployeeView } from 'src/sections/employees/view';

// ----------------------------------------------------------------------

export default function EmployeePage() {
  return (
    <>
      <Helmet>
        <title> Blog | Minimal UI </title>
      </Helmet>

      <EmployeeView />
    </>
  );
}