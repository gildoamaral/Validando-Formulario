// 70548445052   07098772003


class ValidaCPF {
    constructor(cpfEnviado){
        Object.defineProperty( this, 'cpfLimpo', {
            writable: false,
            enumerable: false,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        });
    }

    éSequência() {
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

    criaDigito(cpfSemDigito) {
        const cpfArray = Array.from(cpfSemDigito)
        // '7', '0', '5',
        //   '4', '8', '4',
        //   '4', '5', '0'
        let regressivo = cpfArray.length + 1;

        const total = cpfArray.reduce((ac, value) => {
            ac += value * regressivo;
            regressivo--;
            return ac
        }, 0);

        if ((11 - ( total % 11 )) >= 10) return 0;
        return 11 - ( total % 11 )
    }

    valida() {
        // REQUISITOS DE VALIDADE
        
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo !== 'string') return false;
        if(this.cpfLimpo.length !== 11) return false; 
        if(this.éSequência()) return false;
        
        // CRIA DIGITOS

        const cpfSemDigito = this.cpfLimpo.slice(0, -2)
        const digito1 = this.criaDigito(cpfSemDigito);
        const digito2 = this.criaDigito(cpfSemDigito+digito1)
        const novoCpf = cpfSemDigito + digito1 + digito2;
        // VALIDAR

        return this.cpfLimpo === novoCpf
    }
}