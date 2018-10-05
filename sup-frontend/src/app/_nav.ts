export const navItems = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Admin'
  },
  {
   name: 'Users',
   url: '/users',
   icon: 'icon-user',
   children: [
     {
       name: 'Add Users',
       url: '/users/add',
       icon: 'icon-user-follow'
     },
     {
       name: 'Users List',
       url: '/users',
       icon: 'icon-list'
     },
     {
       name: 'Donner des roles temporaires',
       url: '/users/roletemp',
       icon: 'icon-key'
     },
   ]
 },
 {
  name: 'Classes',
  url: '/classes',
  icon: 'icon-book',
  children: [
    {
      name: 'Ajouter Classe',
      url: '/classes/add',
      icon: 'icon-user-follow'
    },
    {
      name: 'Lister les classes',
      url: '/classes',
      icon: 'icon-list'
    },
  ]
 }, 
 {
   title: true,
   name: 'Teacher'
 },
 {
  name: 'Cours Professeur',
  url: '/cours',
  icon: 'icon-book',
  children: [
    {
      name: 'Ajouter Cours',
      url: '/cours/add',
      icon: 'icon-user-follow'
    },
    {
      name: 'Lister cours',
      url: '/cours',
      icon: 'icon-list'
    },
  ]
}, 
{
  title: true,
  name: 'Student'
},
{
 name: 'Cours Etudiant',
 url: '/courspublic',
 icon: 'icon-book',
 children: [
   {
     name: 'Mes Cours',
     url: '/courspublic/mycour',
     icon: 'icon-user-follow'
   },
   {
     name: 'Lister cours les cours public',
     url: '/courspublic',
     icon: 'icon-list'
   },
 ]
}, 
{
  title: true,
  name: 'Cours Publiés'
},
{
 name: 'Cours Public',
 url: '/courspublic',
 icon: 'icon-book',
},
{
  title: true,
  name: 'Profil'
},
{
 name: 'Modify Profil ',
 url: '/users/modify',
 icon: 'icon-user',
},
];
