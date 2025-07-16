import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export function showLoginSuccess(username: string) {
  return MySwal.fire({
    icon: 'success',
    title: 'Login Successful',
    text: `Welcome back, ${username}!`,
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
}

export function showRegisterSuccess() {
  return MySwal.fire({
    icon: 'success',
    title: 'Registration Successful',
    text: 'Your account has been created. You can now login.',
    timer: 2500,
    timerProgressBar: true,
    showConfirmButton: false,
  });
}

export function confirmLogout(): Promise<boolean> {
  return MySwal.fire({
    title: 'Are you sure?',
    text: 'You will be logged out.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, logout',
    cancelButtonText: 'Cancel',
  }).then(result => result.isConfirmed);
}

export function showLogoutSuccess() {
  return MySwal.fire({
    icon: 'success',
    title: 'Logged out',
    text: 'You have been successfully logged out.',
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
}
