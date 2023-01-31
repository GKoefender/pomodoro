import { HistoryContainer, HistoryList, Status } from './styles'

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
              <td>
                <Status statusColor='green' >Finalizado</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>21 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor='green' >Finalizado</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>21 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor='red' >Parado</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>21 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor='yellow' >Em andamento</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}

export { History }
