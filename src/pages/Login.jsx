import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";







import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Grid,

  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";




























export default function Login() {
const navigate = useNavigate();
  const [newUser, setNewUser] = React.useState(false);
  const [userStatus, setUserStatus] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Debe ser un correo electrónico válido")
        .max(255)
        .required("El Email es requerido"),
      password: Yup.string().max(255).required("La contraseña es requerida"),
    }),
    onSubmit: () => {
      // router.push("/");
    },
  });

   useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  

  const login = async () => {
    const { data } = await axios.post(
      "http://localhost:5000/api/auth/login",
      formik.values
    );

    if (!data.status) {
      setStatusMessage(data.msg);
      setUserStatus(true);
    }else{
      localStorage.setItem(
        process.env.REACT_APP_LOCALHOST_KEY,
        JSON.stringify(data.user)
      );

      navigate("/");
   
    }
  };


  const handleSubmit = async () => {
    if (newUser) {
      console.log("new user");
    } else {
      login();
    }

  };


 
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } =  formik.values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmitt = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          minHeight: "100%",
          height: "100vh",
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              border: "1px solid #cecece",
              p: 2,
              borderRadius: "16px",
            }}
          >
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ my: 3 }}>
                <Typography color="textPrimary" variant="h4">
                  Iniciar Sesión
                </Typography>
                {/*  <Typography color="textSecondary" gutterBottom variant="body2">
                Inicia sesión con:
              </Typography> */}
              </Box>

              {/*   <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Button
                  color="info"
                  fullWidth
                  startIcon={<GoogleIcon />}
                  onClick={() => signIn(providers.google.id)}
                  size="large"
                  variant="contained"
                >
                  Inicia sesión con {providers.google.name}
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  color="error"
                  startIcon={<GoogleIcon />}
                  onClick={() =>
                    signIn(providers.google.id, {
                      callbackUrl: `${window.location.origin}/`,
                    })
                  }
                  size="large"
                  variant="contained"
                >
                  Inicia sesión con {providers.google.name}
                </Button>
              </Grid>
            </Grid> */}

              <Box
                sx={{
                  pb: 1,
                  pt: 1,
                }}
              >
                <Typography
                  align="center"
                  color="textSecondary"
                  variant="body1"
                >
                  Inicia sesión con tu correo electrónico
                </Typography>
              </Box>
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Correo"
                margin="normal"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
                variant="outlined"
              />
              <TextField
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Contraseña"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="outlined"
              />
              {userStatus && (
                <Box>
                  <Typography sx={{ color: "gray" }}>
                    {statusMessage}
                  </Typography>
                </Box>
              )}

              <Box sx={{ py: 2 }}>
                <Button
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Iniciar sesión
                </Button>
              </Box>
              {/*           <Typography color="textSecondary" variant="body2">
              ¿No tienes una cuenta?{" "}
              <NextLink href="/register">
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  Crear
                </Link>
              </NextLink>
            </Typography> */}
            </form>
          </Box>
        </Container>
      </Box>
      
    </>
  );
}
