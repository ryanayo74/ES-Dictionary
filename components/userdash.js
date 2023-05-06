
// For change avatar
userAvatar = document.querySelector('.user-avatar img');
userAvatar.src = 'user-avatar.jpg';

const avatarInput = document.querySelector('#avatar-upload');
avatarInput.addEventListener('change', (event) => {
  const selectedFile = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    userAvatar.src = event.target.result;
  };

  reader.readAsDataURL(selectedFile);
});


// For Edit profile
const editProfileLink = document.querySelector('#edit-profile-link');

const userName = document.querySelector('.user-info h2');
const userEmail = document.querySelector('.user-info p:nth-of-type(1)');
const userPhone = document.querySelector('.user-info p:nth-of-type(2)');

editProfileLink.addEventListener('click', (event) => {
  event.preventDefault();

  if (editProfileLink.textContent === 'Edit Profile') {
    editProfileLink.textContent = 'Save Changes';
    userName.contentEditable = true;
    userEmail.contentEditable = true;
    userPhone.contentEditable = true;
    userName.focus();
  } else {
    editProfileLink.textContent = 'Edit Profile';
    userName.contentEditable = false;
    userEmail.contentEditable = false;
    userPhone.contentEditable = false;
    userName.blur();
  }
});