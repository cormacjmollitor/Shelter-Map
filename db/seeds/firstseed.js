exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({firstname: 'Barry',lastname: 'Allen',email: 'barry.allen@example.com', password: '$2a$04$LLoJkzlHTIyY5MJVNeWgveF1JZes7sUg/ZmJuvAOKvMCvLfXfaQ4G', telephone: '8884444444', picture: 'https://the-hollywood-gossip-res.cloudinary.com/iu/s--NUd2gdO5--/t_xlarge_p/cs_srgb,f_auto,fl_strip_profile.lossy,q_auto:420/v1508320744/the-flash-is-in-trouble.png'}),
        knex('users').insert({firstname: 'Peter',lastname: 'Parker',email: 'peter.parker@example.com', password: '$2a$04$LLoJkzlHTIyY5MJVNeWgveF1JZes7sUg/ZmJuvAOKvMCvLfXfaQ4G', telephone: '8884444444', picture: 'https://assets1.ignimgs.com/thumbs/userUploaded/2018/4/9/screen-shot-2018-04-09-at-122611-pm-1523302110521_270h.png'}),
        knex('users').insert({firstname: 'Steve',lastname: 'Rogers',email: 'steve.rogers@example.com', password: '$2a$04$LLoJkzlHTIyY5MJVNeWgveF1JZes7sUg/ZmJuvAOKvMCvLfXfaQ4G', telephone: '8884444444', picture: 'https://vignette.wikia.nocookie.net/disney/images/a/ad/Steve_Rogers_Avenger-noble_and_true.jpg/revision/latest?cb=20160927111501'})
      ]);
    });
};
