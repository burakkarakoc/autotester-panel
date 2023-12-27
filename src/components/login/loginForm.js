import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const validEmail = email !== "";
    const validPassword = password !== "";

    setIsEmailValid(validEmail);
    setIsPasswordValid(validPassword);

    if (validEmail && validPassword) {
      console.log("Email:", email, "Password:", password);
      // Add logic to handle login
    }
  };

  return (
    <Card className="p-4" style={{ width: "80%" }}>
      <center>
        <CardTitle tag={"h5"}>Login</CardTitle>
      </center>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            valid={isEmailValid === true}
            invalid={isEmailValid === false}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            valid={isPasswordValid === true}
            invalid={isPasswordValid === false}
          />
        </FormGroup>

        <center>
          <Button outline color="primary">
            Sign in
          </Button>
        </center>
      </Form>
    </Card>
  );
};

export default LoginForm;

{
  /* <div>
  <Card inverse>
    <CardImg
      alt="Card image cap"
      src="https://picsum.photos/900/270?grayscale"
      style={{
        height: 270,
      }}
      width="100%"
    />
    <CardImgOverlay>
      <CardTitle tag="h5">Login</CardTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button color="primary">Sign in</Button>
      </Form>
    </CardImgOverlay>
  </Card>
</div>; */
}
