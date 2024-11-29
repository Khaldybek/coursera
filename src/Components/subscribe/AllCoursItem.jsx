// import React from 'react';
// import { Card, CardContent, Typography, CardMedia } from '@mui/material';
//
// const AllCoursItem = ({ data, onClick }) => {
//     return (
//         <Card
//             onClick={onClick}
//             sx={{
//                 cursor: 'pointer',
//                 boxShadow: 4,
//                 padding: 2,
//                 width: '100%',
//                 height: 200,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'space-between',
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                 '&:hover': {
//                     transform: 'scale(1.05)',
//                     boxShadow: 8
//                 },
//                 borderRadius: 2,
//                 backgroundColor: '#f9f9f9',
//                 margin: '10px'
//             }}
//         >
//             <CardMedia
//                 component="img"
//                 alt={data.name}
//                 image={data.files}
//                 sx={{ height: 120, objectFit: 'cover', borderRadius: 2 }}
//             />
//             <CardContent>
//                 <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1c1129', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                     {data.name || "Course Name"}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                     {data.description || "Description"}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
//                     {data.createAt || "Date"}
//                 </Typography>
//             </CardContent>
//         </Card>
//     );
// };
//
// export default AllCoursItem;
