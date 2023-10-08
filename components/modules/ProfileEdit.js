import React from "react";

function ProfileEdit({ value, onChange, title, type = "text" }) {
  return (
    <div className="profile-form__input">
      <div>
        <label htmlFor={value}>{title}</label>
        <input id={value} type={type} value={value} onChange={onChange} />
      </div>
    </div>
  );
}

export default ProfileEdit;
