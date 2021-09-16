class Tabelas { 

    constructor(){
        this.id = 1;
        this.arrayTabela = [];
        this.editId = null;
    }
    
    salvar(){
      let tabela = this.lerDados();
        if(this.validaCampos(tabela)){
            if(this.editId == null){
                this.adicionar(tabela);
                
            }else{
                this.atualizar(this.editId, tabela);
            }
            
        }
        this.grafico();
        this.listaTabela();
        this.cancelar();
    }
    listaTabela(){
        let tbody = document.getElementById('tbody');

        tbody.innerText = '';
        for(let i =0; i < this.arrayTabela.length; i++){
            //criar linhas
            let tr = tbody.insertRow();
            //criar colunas
            let td_id = tr.insertCell();
            let td_dataTabela = tr.insertCell();
            let td_demandaTabela = tr.insertCell();
            let td_capacidadeTabela = tr.insertCell();
            let td_atendimentoPTabela = tr.insertCell();
            let td_atendimentoRTabela = tr.insertCell();
            let td_acoes = tr.insertCell();

            //ler o valores digitados e inclui na lista
            td_id.innerText = this.arrayTabela[i].id;
            td_dataTabela.innerText = this.arrayTabela[i].dataTabela;
            td_demandaTabela.innerText = this.arrayTabela[i].demandaTabela;
            td_capacidadeTabela.innerText = this.arrayTabela[i].capacidadeTabela;
            td_atendimentoPTabela.innerText = this.arrayTabela[i].atendimentoPTabela;
            td_atendimentoRTabela.innerText = this.arrayTabela[i].atendimentoRTabela;

            let imgEdit = document.createElement('img');
            imgEdit.src = 'imagens/edit.png';
            imgEdit.setAttribute("onclick","tabelas.preparaEdicao("+ JSON.stringify(this.arrayTabela[i])+")");
            
            let imgDelete = document.createElement('img');
            imgDelete.src = 'imagens/excluir.png';
            imgDelete.setAttribute("onclick","tabelas.deletar("+this.arrayTabela[i].id+")");

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);
        }
    }
    adicionar(tabela){
        tabela.capacidadeTabela = parseFloat(tabela.capacidadeTabela);
        this.arrayTabela.push(tabela);
        this.id++;
    }
    atualizar(id,tabela){
        for(let i=0; i< this.arrayTabela.length; i++){
            if(this.arrayTabela[i].id == id){
                this.arrayTabela[i].dataTabela = tabela.dataTabela;
                this.arrayTabela[i].demandaTabela = tabela.demandaTabela;
                this.arrayTabela[i].capacidadeTabela = tabela.capacidadeTabela;
                this.arrayTabela[i].atendimentoPTabela = tabela.atendimentoPTabela;
                this.arrayTabela[i].atendimentoRTabelabela = tabela.atendimentoRTabelabela;
            }
        }
    }
    preparaEdicao(dados){
        //passa para o editId o valor do id
        this.editId = dados.id;

        document.getElementById('data').value = dados.dataTabela;
        document.getElementById('demanda').value = dados.demandaTabela;
        document.getElementById('capacidade').value = dados.capacidadeTabela;
        document.getElementById('atendimentoP').value = dados.atendimentoPTabela;
        document.getElementById('atendimentoR').value = dados.atendimentoRTabela;

        document.getElementById('btn1').innerText = 'Atualizar';

    }
    lerDados(){
        let tabela={
        }
       tabela.id = this.id;
       tabela.dataTabela = document.getElementById('data').value;
       tabela.demandaTabela = document.getElementById('demanda').value;
       tabela.capacidadeTabela = document.getElementById('capacidade').value;
       tabela.atendimentoPTabela = document.getElementById('atendimentoP').value;
       tabela.atendimentoRTabela = document.getElementById('atendimentoR').value;
        
       return tabela;
    }
    validaCampos(tabela){
        let msg = '';
        
        if(tabela.dataTabela == ''){
            msg += '- Informe a data:\n'
        }

        if(tabela.demandaTabela == ''){
            msg += '- Informe a demanda:\n'
        }
        
        if(tabela.capacidadeTabela == ''){
            msg += '- Informe a capacidade:\n'
        }
        
        if(tabela.atendimentoPTabela == ''){
            msg += '- Informe o atendimento planejado:\n'
        }
        if(tabela.atendimentoRTabela == ''){
            msg += '- Informe o atendimento Realizado:\n'
        }
        if(msg != ''){
            alert(msg);
            return false;
        }
        return true;
    }
    cancelar(){
       document.getElementById('data').value = '';
       document.getElementById('demanda').value = '';
       document.getElementById('capacidade').value = '';
       document.getElementById('atendimentoP').value = '';
       document.getElementById('atendimentoR').value = '';

       document.getElementById('btn1').innerText = 'Salvar';
       this.editId = null;
    }

    deletar(id){
        
        if(confirm('Deseja realmente deletar a linha do ID ' + id)){
            let tbody = document.getElementById('tbody');

        for(let i =0; i<this.arrayTabela.length;i++){
            if(this.arrayTabela[i].id ==id){
                this.arrayTabela.splice(i,1);
                tbody.deleteRow(i);
            }
        }
        }
        
    }
  
 
    grafico(){
    
        google.charts.load('current',{'packages':['corechart','controls']});
        google.charts.setOnLoadCallback(drawChart);

    
        function drawChart(){
    
        
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'y');
            data.addColumn('number', 'Data');
            data.addRows([
            ['Data', 2017],
            ['', 2018],
            ['', 2019], 
            ['', 2020],
            ['', 2021]
            ]);
            
        var options = {'title':'Gráfico Principal',
        'width':1000,
        'height':500};

            var chart = new google.visualization.ColumnChart(document.getElementById('graficoLinha'));
            chart.draw(data, options);
        }
    }


};


var tabelas = new Tabelas(); 
