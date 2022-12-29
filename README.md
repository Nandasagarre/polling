# polling
Follwing are the end points created;
'/seeallquest'
'/createquest'
'/addoptionto'
'/addVoteTo'
'/deleteoption'
'/deletequestion'
cannot delete a option with vaote > 0;
cannot delete a question that any of this option with vote > 0;
a question can have not more than 4 options;


If uou are testing by cloning directly from git use:
http://localhost:3000/api/...

If tou are using EC2 deployed then use:
http://ec2-3-84-18-60.compute-1.amazonaws.com:3000/api/...
