import React from 'react'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function DashboardCard({titre,count,cardColor,path}) {
    const navigate = useNavigate();

  return (
<Card sx={{ minWidth: 275, bgcolor: `${cardColor}` }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
{          titre}        </Typography>

        <Typography variant="h4">{count}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>{navigate(`${path}`)}}>Voir Tous</Button>
      </CardActions>
    </Card>
    )
}

export default DashboardCard