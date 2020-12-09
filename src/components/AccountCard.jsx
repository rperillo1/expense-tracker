import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { AccountContext } from '../contexts/AccountContext';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    main: {
        margin: 5,
        flexGrow: 1,
    },
    root: {
        minWidth: 375,
        margin: 2
    },
    title: {
        fontSize: 16,
    },
    pos: {
        marginBottom: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    action: {
        display: 'flex',
        justifyContent: 'space-around'
    }
}));


function AccountCard({ deleteOneAccount }) {
    const { user, setUser } = useContext(UserContext);
    const { accounts, setAccounts } = useContext(AccountContext);
    const classes = useStyles();


    return (
        <div className={classes.main}>
            {Object.keys(user).length > 0 ?
                accounts.map((acc) =>
                    <Grid container 
                        spacing={3} className={classes.root} justify="space-around" alignItems="center">
                        <Grid item xs={6} sm={8}>
                            <Paper className={classes.paper}>
                                <Card>
                                    <CardContent>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            Account Name
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            {acc.name}
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            Balance: {acc.balance}
                                        </Typography>
                                    </CardContent>
                                    <CardActions className={classes.action}>
                                        <Button size="small" 
                                        >Go to Account</Button>
                                        <Button size="small"
                                        onClick={() => deleteOneAccount(acc._id)}
                                        >Delete Account</Button>
                                    </CardActions>
                                </Card>
                            </Paper>
                        </Grid>
                    </Grid>
                )
                :
                <div>Please Create An Account</div>
            }
        </div>
    );
}

export default AccountCard;