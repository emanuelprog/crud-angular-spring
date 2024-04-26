package com.emanuel.crudspring.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.emanuel.crudspring.model.Cliente;
import com.emanuel.crudspring.service.ClienteService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/clientes")
@AllArgsConstructor
public class ClienteController {

    private ClienteService clienteService;

    @GetMapping
    public ResponseEntity<List<Cliente>> list() {
       List<Cliente> clientes = clienteService.getClientes();
       try {
        return ResponseEntity.status(HttpStatus.OK).body(clientes);
       } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
       }
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Optional<Cliente>> findById(@PathVariable Long id) {
       Optional<Cliente> cliente = clienteService.findById(id);
       try {
        return ResponseEntity.status(HttpStatus.OK).body(cliente);
       } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
       }
    }

    @PostMapping
    public ResponseEntity<Cliente> adicionar(@RequestBody Cliente cliente) {
        try {
            Cliente clienteNovo = clienteService.saveCliente(cliente);
            return ResponseEntity.status(HttpStatus.CREATED).body(clienteNovo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Cliente> atualizar(@PathVariable Long id, @RequestBody Cliente cliente) {
        try {
            Cliente clienteRetorno = clienteService.updateCliente(id, cliente);
            return ResponseEntity.status(HttpStatus.OK).body(clienteRetorno);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Cliente> excluir(@PathVariable Long id) {
        try {
            clienteService.deleteCliente(id);
            return ResponseEntity.status(HttpStatus.OK).body(null);            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
