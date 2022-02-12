package com.javaspring.proj.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "role_table")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
}
