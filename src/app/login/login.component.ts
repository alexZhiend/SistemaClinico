import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/_service/login.service';
import { Router } from '@angular/router';
import { TOKEN_NAME } from 'src/app/_shared/var.constant';
import { MenuService } from 'src/app/_service/menu.service';
import * as decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  usuario: string;
  clave: string;

  constructor(private loginService: LoginService, private router: Router,  private menuService: MenuService) { }

  ngOnInit() {
  }



  iniciarSesion(){
    this.loginService.login(this.usuario, this.clave).subscribe(data=>{
      //console.log(data);
      if (data) {
        let token = JSON.stringify(data);
        sessionStorage.setItem(TOKEN_NAME, token);

        let tk = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
        const decodedToken = decode(tk.access_token);
        console.log(decodedToken);

        this.menuService.listarPorUsuario(decodedToken.user_name).subscribe(data => {
          this.menuService.menuCambio.next(data);
        });

        console.log(decodedToken.authorities);
        let roles = decodedToken.authorities;
        for (let i = 0; roles.length; i++) {
          let rol = roles[i];
          if (rol === 'ADMISION') {
            this.router.navigate(['historial']);
            break;  
          } else {
            if (rol === 'FARMACIA') {
              this.router.navigate(['producto']);
              break;  
            }else{
              if (rol === 'LABORATORIO') {
                this.router.navigate(['detalleexamengeneral']);
                break;  
              }else{
                if (rol === 'CAJA') {
                  this.router.navigate(['comprobantepago']);
                  break;  
                }else{
                  if (rol === 'TRIAJE') {
                    this.router.navigate(['paciente']);
                    break;  
                  }else{
                    if (rol === 'ADMIN') {
                      this.router.navigate(['paciente']);
                      break;  
                    }else{
                        this.router.navigate(['paciente']);
                    }
                  }  
                }
              }
            }
          }
        }
      }

    });


  }

}
