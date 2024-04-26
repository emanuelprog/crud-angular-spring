package com.emanuel.crudspring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.emanuel.crudspring.exception.InvalidRequestException;
import com.emanuel.crudspring.model.Cliente;
import com.emanuel.crudspring.repository.ClienteRepository;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> getClientes() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> findById(Long id) {
        return clienteRepository.findById(id);
    }

    public Cliente saveCliente(Cliente cliente) {
        try {
            return clienteRepository.save(cliente);
        } catch (Exception e) {
            throw new InvalidRequestException("Dados inválidos", e);
        }
    }

    public Cliente updateCliente(Long id, Cliente cliente) {
        Optional<Cliente> clienteDB = clienteRepository.findById(id);

        if (clienteDB.isPresent()) {
            cliente.setId(id);
           return clienteRepository.save(cliente);
        } else {
            throw new InvalidRequestException("Não foi possível atualizar o cliente", null);
        }
    }

    public void deleteCliente(Long id) {
        Optional<Cliente> clienteDB = clienteRepository.findById(id);

        if (clienteDB.isPresent()) {
            clienteRepository.deleteById(id);
        } else {
            throw new InvalidRequestException("Não foi possível deletar o cliente", null);
        }
    }
    
}
