const itemsDriveD = [];
const itemsDriveC = [{
  id: '1',
  name: 'Documents',
  icon: 'activefolder',
  isDirectory: true,
  expanded: true,
}, {
  id: '2',
  parentId: '1',
  name: 'Projects',
  icon: 'activefolder',
  isDirectory: true,
  expanded: true,
}, {
  id: '3',
  parentId: '2',
  name: 'About.rtf',
  icon: 'file',
  isDirectory: false,
  expanded: true,
}, {
  id: '4',
  parentId: '2',
  name: 'Passwords.rtf',
  icon: 'file',
  isDirectory: false,
  expanded: true,
}, {
  id: '5',
  parentId: '2',
  name: 'About.xml',
  icon: 'file',
  isDirectory: false,
  expanded: true,
}, {
  id: '6',
  parentId: '2',
  name: 'Managers.rtf',
  icon: 'file',
  isDirectory: false,
  expanded: true,
}, {
  id: '7',
  parentId: '2',
  name: 'ToDo.txt',
  icon: 'file',
  isDirectory: false,
  expanded: true,
}, {
  id: '8',
  name: 'Images',
  icon: 'activefolder',
  isDirectory: true,
  expanded: true,
}, {
  id: '9',
  parentId: '8',
  name: 'logo.png',
  icon: 'file',
  isDirectory: false,
  expanded: true,
}, {
  id: '10',
  parentId: '8',
  name: 'banner.gif',
  icon: 'file',
  isDirectory: false,
  expanded: true,
}, {
  id: '11',
  name: 'System',
  icon: 'activefolder',
  isDirectory: true,
  expanded: true,
}, {
  id: '12',
  parentId: '11',
  name: 'Employees.txt',
  icon: 'file',
  isDirectory: false,
  expanded: true,
}, {
  id: '13',
  parentId: '11',
  name: 'PasswordList.txt',
  icon: 'file',
  isDirectory: false,
  expanded: true,
}, {
  id: '14',
  name: 'Description.rtf',
  icon: 'file',
  isDirectory: false,
  expanded: true,
}, {
  id: '15',
  name: 'Description.txt',
  icon: 'file',
  isDirectory: false,
  expanded: true,
}];

export default {
  getItemsDriveC() {
    return itemsDriveC;
  },
  getItemsDriveD() {
    return itemsDriveD;
  },
};
