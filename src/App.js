import { useState } from 'react';
import { Button, Card, CardTitle, Label, Input } from "reactstrap";
import copyIcon from "./images/icon-copy.svg";
import "./App.css";


const Options = ({ options, checked, onChange }) => {
  return (
    <div>
      <Input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <Label className="option" check>
        {options}
      </Label>
    </div>
  )
}


export default function App() {

  const [password, setPassword] = useState("Your password will appear here");
  const [length, setLength] = useState(8);
  const [checkedLowercase, setCheckedLowercase] = useState(false);
  const [checkedUppercase, setCheckedUppercase] = useState(false);
  const [checkedNumbers, setCheckedNumbers] = useState(false);
  const [checkedSymbols, setCheckedSymbol] = useState(false);
  const [checkedDuplicates, setCheckedDuplicates] = useState(false);
  const [checkedSpaces, setCheckedSpaces] = useState(false);

  const handleChangeLower = () => {
    setCheckedLowercase(!checkedLowercase);
  };

  const handleChangeUpper = () => {
    setCheckedUppercase(!checkedUppercase);
  };

  const handleChangeNumber = () => {
    setCheckedNumbers(!checkedNumbers);
  };

  const handleChangeSymbols = () => {
    setCheckedSymbol(!checkedSymbols);
  };

  const handleChangeDuplicates = () => {
    setCheckedDuplicates(!checkedDuplicates);
  };

  const handleChangeSpaces = () => {
    setCheckedSpaces(!checkedSpaces);
  };

  const copypassword = () => {
    navigator.clipboard.writeText(password);
  };

  const generatePassword = () => {

    let charset = "";
    let noOption = "Please select atleast one option"
    if (checkedLowercase) {
      charset += "abcdefghijklmnopqrstuvwxyz";
    }
    if (checkedUppercase) {
      charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (checkedNumbers) {
      charset += "0123456789";
    }
    if (checkedSymbols) {
      charset += "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    }

    let password = "";
    while (password.length < length) {
      let randomChar = charset[Math.floor(Math.random() * charset.length)];
      if (checkedDuplicates || !password.includes(randomChar)) {
        password += randomChar;
      }
    }

    if (!checkedSpaces) {
      password = password.replace(/\s+/g, '');
    }

    setPassword(password);

    if (!checkedDuplicates && !checkedLowercase && !checkedNumbers && !checkedSpaces && !checkedSymbols && !checkedUppercase){
      setPassword(noOption);
    }
  };

  return (
    <div className="container-box">
      <Card className="form-container">
        <h4 className="form-heading">Password Generator</h4>
        <Card></Card>
        <Card className="password-container">
          <CardTitle className="password">{password}</CardTitle>
          <Button className="copy-button" onClick={copypassword}>
            <img src={copyIcon} />
          </Button>
        </Card>
        <div className="settings-container">
          <div>
          <CardTitle>Password Length</CardTitle>
          <CardTitle>{length}</CardTitle>
          </div>
          <Input
            name="range"
            type="range"
            min="5"
            max="30"
            onChange={e => setLength(e.target.value)}
            value={length}
          />
          <CardTitle>Password Settings</CardTitle>
          {/* <label>
          <input type="checkbox" />
          Lowercase (a-z)
        </label>
        <Input type="checkbox" />
        <Label>
          Check me out
        </Label> */}
          <div className="options">
            <Options checked={checkedLowercase} options="Lowercase (a - z)" onChange={handleChangeLower} />
            <Options checked={checkedUppercase} options="Uppercase (A - Z)" onChange={handleChangeUpper} />
            <Options checked={checkedNumbers} options="Numbers (0 - 9)" onChange={handleChangeNumber} />
            <Options checked={checkedSymbols} options="Symbols (!-$^+)" onChange={handleChangeSymbols} />
            <Options checked={checkedDuplicates} options="Exclude Duplicates" onChange={handleChangeDuplicates} />
            <Options checked={checkedSpaces} options="Include Spaces" onChange={handleChangeSpaces} />
          </div>
        </div>
        <div className="button-container">
          <Button
            className="generate-button"
            color="primary"
            onClick={generatePassword}
          >Generate Password
          </Button>
        </div>
      </Card>
    </div>
  );
}


