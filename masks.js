// Máscaras leves para atender ao requisito de 'aplicar máscaras' (sem backend)
(function(){
  'use strict';
  function maskCPF(v){
    v = v.replace(/\D/g,'');
    v = v.replace(/(\d{3})(\d)/,'$1.$2');
    v = v.replace(/(\d{3})(\d)/,'$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/,'$1-$2');
    return v;
  }
  function maskPhone(v){
    v = v.replace(/\D/g,'');
    if(v.length > 10){
      v = v.replace(/(\d{2})(\d{5})(\d{4}).*/,'($1) $2-$3');
    } else if(v.length > 6){
      v = v.replace(/(\d{2})(\d{4})(\d{0,4}).*/,'($1) $2-$3');
    } else if(v.length > 2){
      v = v.replace(/(\d{2})(\d{0,5})/,'($1) $2');
    } else {
      v = v.replace(/(\d*)/,'($1');
    }
    return v;
  }
  function maskCEP(v){
    v = v.replace(/\D/g,'');
    v = v.replace(/(\d{5})(\d)/,'$1-$2');
    return v;
  }
  document.addEventListener('DOMContentLoaded', function(){
    var cpf = document.getElementById('cpf');
    var tel = document.getElementById('telefone');
    var cep = document.getElementById('cep');
    var form = document.getElementById('form-cadastro');
    var fb = document.getElementById('feedback');

    if(cpf){ cpf.addEventListener('input', function(e){ e.target.value = maskCPF(e.target.value); }); }
    if(tel){ tel.addEventListener('input', function(e){ e.target.value = maskPhone(e.target.value); }); }
    if(cep){ cep.addEventListener('input', function(e){ e.target.value = maskCEP(e.target.value); }); }

    if(form){
      form.addEventListener('submit', function(ev){
        ev.preventDefault();
        if(form.checkValidity()){
          fb.textContent = 'Cadastro validado! (simulação)';
          fb.className = 'success';
          form.reset();
        } else {
          fb.textContent = 'Verifique os campos obrigatórios.';
          fb.className = 'error';
          var inv = form.querySelector(':invalid');
          if(inv){ inv.focus(); }
        }
      });
    }
  });
})();