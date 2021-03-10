import { useState, FormEvent, ChangeEvent, useRef, useEffect } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import {
  Button,
  Container,
  Form,
  FormControl,
  InputGroup,
  Navbar,
} from 'react-bootstrap';

const NavBar = () => {
  const { search } = useLocation();
  const query = search.split('=')[1];
  const [validate, setValidate] = useState<boolean>(false);
  const [value, setValue] = useState<string>(query);
  const history = useHistory();
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (validate) setValidate(false);
    setValue(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return setValidate(true);

    return history.push(`/?query=${value}`);
  };

  useEffect(() => {
    if (!query && inputRef.current) {
      inputRef.current.value = '';
    }
  }, [query]);

  return (
    <Navbar bg="dark" expand="lg" data-testid="navbar">
      <Container>
        <Navbar.Brand>
          <NavLink to="/" className="text-white text-decoration-none">
            News App
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form
            inline
            className="mt-2 mt-lg-0 ml-auto search-form"
            onSubmit={onSubmit}
            noValidate
            validated={validate}
            data-testid="form"
          >
            <InputGroup hasValidation>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-0 mr-lg-2 bg-transparent shadow-none text-white"
                onChange={onChange}
                defaultValue={value}
                required
                data-testid="input"
                ref={inputRef}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                Enter at least one character
              </Form.Control.Feedback>
            </InputGroup>
            <Button
              variant="outline-success mt-2 mt-lg-0"
              type="submit"
              data-testid="submit"
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
