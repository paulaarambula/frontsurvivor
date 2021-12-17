import { useState } from "react";

const FileTableUsers = () => {
  const [infoNewUser, setInfoNewUser] = useState({
    name: "gustavo",
    mail: "user.mail,"
    
  });
  console.log("infoNewUser", infoNewUser)
  return (
      <input type="text" value={infoNewUser.name} name="name" onChange={(e)=>setInfoNewUser({...infoNewUser, name: e.target.value})} />
  )
}
export default FileTableUsers;

