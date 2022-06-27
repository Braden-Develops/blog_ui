import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import BlogPaginator from "../components/BlogPaginator";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// In order to get the lines to hide I had to abstract my BasicItem out one more time to properly scope the {hidden} attr
// Then the button within the line can be passed a callback to the handleHide function.

function BasicItem(props) {
  const [hidden, setHidden] = useState(false);

  // Set state triggers a re-render of a component with the callback provided
  const handleHide = () => {
    setHidden(!hidden);
  };

  // Importantly this is what allows us to define whether or not this element should be rendered
  // If not hidden, then render, else return null which does not render anything
  return !hidden ? (
    <React.Fragment>
      <Item key={props.id}>
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography textAlign="left" variant="caption">
            Added {new Date(props.creationtimestamp).toLocaleString()}
          </Typography>
          <Typography
            sx={{ fontWeight: "bold" }}
            textAlign="center"
            variant="h6"
          >
            {props.title}
          </Typography>
          <Typography textAlign="right" variant="caption">
            Modified {new Date(props.modificationtimestamp).toLocaleString()}
          </Typography>
        </Box>
        <Typography textAlign="left">{props.abstract}</Typography>
        <Box sx={{ position: "center", marginRight: "5", marginLeft: "auto" }}>
          <Button
            variant="outlined"
            size="small"
            color="warning"
            onClick={() => {
              handleHide();
            }}
          >
            Read More
          </Button>
        </Box>
      </Item>
    </React.Fragment>
  ) : null;
}

export default function BasicStack() {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [apiError, setApiError] = useState(false);

  console.log("Loaded " + isLoaded);
  console.log("Error " + apiError);

  // Runs after EVERY render of this object, which is only rendered once when the page loads
  // So right now, this simply loads all of the records from jsonplaceholder/posts/
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/posts/");
        if (response.ok) {
          const json = await response.json();
          console.log(json);
          setData(json);
          setIsLoaded(true);
        } else {
          throw new Error("Non-ok response code");
        }
      } catch (e) {
        console.warn(e);
        setApiError(true);
      }
    };
    fetchData();
  }, []); // It is critical to input an empty list here when you only want to query once.
  // Otherwise you WILL infinitely loop requests

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          padding: "1em",
        }}
      >
        {!apiError ? (
          <React.Fragment>
            {isLoaded ? (
              <React.Fragment>
                <Stack width={"90%"} spacing={"1em"} paddingBottom="1em">
                  {data.map((record) => {
                    return <BasicItem key={record.id} {...record}></BasicItem>;
                  })}
                </Stack>
                <BlogPaginator></BlogPaginator>
              </React.Fragment>
            ) : (
              <CircularProgress />
            )}
          </React.Fragment>
        ) : (
          <Stack sx={{ width: "20%" }} spacing={2}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Failed to fetch blog data
            </Alert>
          </Stack>
        )}
      </Box>
    </React.Fragment>
  );
}
