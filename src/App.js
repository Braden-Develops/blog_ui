import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import BlogPostList from "./pages/BlogPostList";
import Resume from "./pages/Resume";
import Contact from './pages/Contact'
import BlogPost from "./pages/BlogPost"
import Landing from './pages/Landing'
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { CssBaseline } from "@mui/material";

let theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#20751f",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#ffffff",
    },
  },
});

export default function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResponsiveAppBar></ResponsiveAppBar>
        <Routes>
        <Route index element={<Landing />} />
          <Route path="blog" element={<BlogPostList />}>
            <Route path=":id" element={<BlogPost />} />
          </Route>
          <Route path="resume" element={<Resume />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </ThemeProvider>
    </React.Fragment>
  );
}
