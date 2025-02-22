/* eslint-disable consistent-return */
/* eslint-disable operator-linebreak */
/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */

const checkUsername = () => {
  const { value: username } = querySelector('#username');
  if (username.length <= 6) {
    querySelector('#username_error').textContent =
      'Please Enter a valid UserName,at least 6 characters';
    return false;
  }
  clearText(['#username_error']);
  return true;
};

const checkEmail = () => {
  const { value: email } = querySelector('#email');
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!regexEmail.test(email) || email.length <= 0) {
    querySelector('#email_error').textContent = 'Please Enter a valid E-mail';
    return false;
  }
  if (email.length <= 8 || email.length >= 100) {
    querySelector('#email_error').textContent =
      'Email at least 8 characters,and less than 100 characters';
    return false;
  }
  clearText(['#email_error']);
  return true;
};

const checkPassword = () => {
  const { value: password } = querySelector('#password');
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  if (!regexPassword.test(password) || password.length <= 0) {
    querySelector('#password_error').textContent =
      'Please Enter a valid Password,The password contain symbols, numbers and letters (uppercase, lowercase)';
    return false;
  }
  if (password.length <= 8 || password.length >= 255) {
    querySelector('#password_error').textContent =
      'Please Enter a valid Password,The password must be at least 8';
    return false;
  }
  clearText(['#password_error']);
  return true;
};

const checkConfirmPassword = () => {
  const { value: password } = querySelector('#password');
  const { value: confirmPassword } = querySelector('#confirm-password');
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  if (confirmPassword !== password) {
    querySelector('#password_error').textContent =
      "'Sorry! Your Passwords don't match'";
    return false;
  }
  if (confirmPassword.length <= 8 || confirmPassword.length >= 255) {
    querySelector('#password_error').textContent =
      'Password at least 8 characters';
    return false;
  }
  if (!regexPassword.test(confirmPassword) || confirmPassword.length <= 0) {
    querySelector('#password_error').textContent =
      'Please Enter a valid Password,The password contain symbols, numbers and letters (uppercase, lowercase)';
    return false;
  }
  clearText(['#password_error']);
  return true;
};

addListener('#username', 'focusout', checkUsername);
addListener('#email', 'focusout', checkEmail);
addListener('#password', 'focusout', checkPassword);
addListener('#confirm-password', 'focusout', checkConfirmPassword);

const handleSubmitFrom = () => {
  if (
    checkUsername() &&
    checkEmail() &&
    checkPassword() &&
    checkConfirmPassword()
  ) {
    clearText(['#password_error', '#username_error', '#email_error']);
    // handle send request

    const username = querySelector('#username').value;
    const email = querySelector('#email').value;
    const password = querySelector('#password').value;
    const confirmPassword = querySelector('#confirm-password').value;

    registerNewUser({ username, email, password, confirmPassword })
      .then(({ status, message }) => {
        if (status === 403) {
          useAlert('Error', message, 'error', 'Ok', 'center', 2000, false);
          return false;
        }

        useAlert(
          'Success',
          'Register Successfully 😉',
          'success',
          'Ok',
          'center',
          2000,
          false,
        );
        clearInputText([
          '#username',
          '#email',
          '#password',
          '#confirm-password',
        ]);

        window.location.href = '/games';
      })
      .catch((error) => {
        useAlert('Error', error.message, 'error', 'Ok', 'center', 2000, false);
      });
  } else {
    // handle send request
    useAlert(
      'Error!',
      'Sorry! You invalid credentials',
      'error',
      'Ok',
      'center',
      2000,
      false,
    );
  }
};

addListener('#form-submit', 'click', handleSubmitFrom);
