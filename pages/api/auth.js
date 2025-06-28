import { createClient } from '@supabase/supabase-js';

const supaUrl = 'https://joszfjstfxchisajaiye.supabase.co';
const supaKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impvc3pmanN0ZnhjaGlzYWphaXllIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcwNzQxMjcsImV4cCI6MjAwMjY1MDEyN30.l9bAK4GP1SGcYdSCGkxzC-12ZVBRLsIlFBuihFA-F_0';
const secure = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impvc3pmanN0ZnhjaGlzYWphaXllIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NzA3NDEyNywiZXhwIjoyMDAyNjUwMTI3fQ.Rw8aLx7RAVMcGDM043n7DFodIW_cHBd-5m1m8OPdMhU';

const supabase = createClient(supaUrl, secure)

export default function handler(req, res){
    if(req.method === 'POST'){
        if(req.body.action === 'signup'){
            handleSignup(req, res)
        } else if(req.body.action === 'signin'){
            handleSignIn(req, res)
        } else if (req.bodyy.action === 'signout'){
            handleSignOut(req, res)
        } else {
            res.status(400).json({error: 'Invalid action'});
        }
    } else {
        res.status
    }
}

async function handleSignup(req, res){
    const {email, password} = req.body;

    const {user, error} = supabase.auth.signUp({email, password});

    if(error){
        res.status(400).json({error: error.message})
    } else {
        res.status(200).json({message: 'Sign up successful!'})
    }
}

async function handleSignIn(req, res){
    const {email, password} = req.body;

    const {user, error} = supabase.auth.signInWithPassword({email, password});

    if(error){
        res.status(400).json({error: error.message})
    } else {
        res.status(200).json({message: 'Sign in successful!'})
    }
}

async function handleSignOut(req, res){
    const {error} = await supabase.auth.signOut();

    if(error){
        res.status(400).json({error: error.message})
    } else {
        res.status(200).json({message: 'Sign out succesful!'})
    }
}
