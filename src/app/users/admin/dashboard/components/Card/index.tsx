import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { ResponsivePie } from "@nivo/pie";

const Card = ({ icon, title, subTitle, chartDesc, data, scheme }: any) => {
  return (
    <>
      <Paper
        sx={{
          flexGrow: 1,
          minWidth: "333px",
          p: 1.5,
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#374357",
          color: "#e5e5e5"
        }}
      >
        <Stack gap={1}>
          {icon}
          <Typography variant="body2" sx={{ fontSize: "20px", marginLeft: "3px", fontWeight: "bold" }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "16px" }}>
            {subTitle}
          </Typography>
        </Stack>
        <Stack alignItems={"center"}>
          <Box height={"75px"} width={"75px"}>
            <ResponsivePie
              data={data}
              margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
              innerRadius={0.7}
              colors={{ scheme: scheme }}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{
                from: "color",
                modifiers: [["darker", 0.2]],
              }}
              enableArcLinkLabels={false}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#333333"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              enableArcLabels={false}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{
                from: "color",
                modifiers: [["darker", 2]],
              }}
              defs={[
                
              ]}
              
              legends={[]}
            />
          </Box>
          <Typography variant="body2">{chartDesc}</Typography>
        </Stack>
      </Paper>
    </>
  );
};

export default Card;
