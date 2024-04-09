//variables have to exist anywhere in the project
export const environment = 
{
    production: true,
    //Workout environment files

 
    //working domain on localhost: ec2-13-56-4-81.us-west-1.compute.amazonaws.com

    //localhost:9992/ for speed access testing on local machines <copy paste this localhost for quick local machine tests>

    //this domain must connect to the Application Load Balancer: Nor-Cal-Balancer-1633629742.us-west-1.elb.amazonaws.com:443 (needs to connect to HTTPs

    //https://app.fitn3ss777.com/

    domain: 'https://app.fitn3ss777.com/',
    //API Domain + Token (for workout)
    domainAPI: 'https://api.api-ninjas.com/v1/exercises?muscle=',
    apiToken: '+DtUIWAFl6kdh41FiLozdQ==epM2bhbS68zeaVX2',
    
    //Login 
    

    //Chat Environment Files
    APP_ID:'6279D009-123D-4D17-B465-304E61CC270A', 
    API_TOKEN: '7ae56f398121b13568a43ab2922cc7812946e434',
    baseSBURL: 'https://api-' 
};
