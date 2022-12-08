export class Router {
  routes = {}

  add(routeName, link) {
    this.routes[routeName] = link
  }

  route (event) {
    event = event || window.event
    event.preventDefault()
  
    window.history.pushState({}, "", event.target.href)
    
    this.handle()
  }
  
  handle() {
    const {pathname} = window.location
    const route = this.routes[pathname] || this.routes[404]
  
    fetch(route)
    .then(data => data.text())
    .then(html => {
      document.querySelector('#app').innerHTML = html
    })
  
    switch (window.location.pathname) {
      case "/universo":
        document.body.classList.add('body-universo')
        document.body.classList.remove('body-exploracao')
        break;
      case "/exploracao":
        document.body.classList.remove('body-universo')
        document.body.classList.add('body-exploracao')
        break;
      default:
        document.body.classList.remove('body-universo')
        document.body.classList.remove('body-exploracao')
    }
  
  }
  
}