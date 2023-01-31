import { HistoryContainer, HistoryList } from './styles'

const History = (): JSX.Element => {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tarefa</td>
              <td>21 minutos</td>
              <td>Há 2 meses</td>
              <td>Finalizado</td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>21 minutos</td>
              <td>Há 2 meses</td>
              <td>Finalizado</td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>21 minutos</td>
              <td>Há 2 meses</td>
              <td>Finalizado</td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>21 minutos</td>
              <td>Há 2 meses</td>
              <td>Finalizado</td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}

export { History }
