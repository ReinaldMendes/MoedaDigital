# MoedaDigital

Sim, você está correto! Ao realizar uma transação envolvendo carteiras, é importante que o saldo das carteiras envolvidas seja atualizado corretamente. Aqui estão os principais pontos a serem considerados:

1. Transferência (walletFrom para walletTo):

O saldo da walletFrom deve ser diminuído pelo valor da transação.

O saldo da walletTo deve ser aumentado pelo mesmo valor.



2. Depósito:

Ao depositar em uma carteira, o saldo dessa carteira deve ser aumentado pelo valor do depósito.



3. Retirada (Saque):

Ao retirar de uma carteira, o saldo deve ser diminuído pelo valor retirado.




Implementação Prática

Para implementar isso em seu transacoes_controller, você precisará realizar atualizações nos saldos das carteiras antes de confirmar a transação. Aqui está um exemplo de como você pode modificar a função store no seu controlador de transações para lidar com isso:

import transacao from "../models/transacoes_model.js";
import carteira from "../models/carteira_model.js"; // Importa o modelo de carteira

export const store = async (req, resp) => {
  try {
    const { walletFrom, walletTo, amount, typeTransition } = req.body;

    // Verifica se a transação é uma transferência
    if (typeTransition === "transfer") {
      // Encontra as carteiras envolvidas
      const fromWallet = await carteira.findById(walletFrom);
      const toWallet = await carteira.findById(walletTo);

      // Verifica se a carteira de origem tem saldo suficiente
      if (fromWallet.balance < amount) {
        return resp.status(400).json({ error: "Saldo insuficiente." });
      }

      // Atualiza os saldos das carteiras
      fromWallet.balance -= amount; // Diminui o saldo da carteira de origem
      toWallet.balance += amount; // Aumenta o saldo da carteira de destino

      await fromWallet.save(); // Salva as alterações da carteira de origem
      await toWallet.save(); // Salva as alterações da carteira de destino
    }

    // Cria a transação
    const content = await transacao.create(req.body);
    resp.status(201).json(content);
  } catch (error) {
    resp.status(400).json(error);
  }
};

Observações

Validação: É essencial validar se a carteira de origem tem saldo suficiente para a transação antes de realizar a transferência.

Atomicidade: Você pode querer considerar usar transações de banco de dados, se seu banco de dados suportar, para garantir que todas as operações sejam concluídas com sucesso ou revertidas em caso de falha. Isso ajuda a manter a integridade dos dados.

Atualização de Saldo: Certifique-se de que as carteiras sejam atualizadas corretamente após a criação da transação.


Implementar essas verificações e atualizações garante que o saldo das carteiras esteja sempre correto após qualquer operação.
